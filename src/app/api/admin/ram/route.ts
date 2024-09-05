import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const user = await getUserSession();
  if (!user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== Role.ADMIN)
    return NextResponse.json({ message: 'No access' }, { status: 403 });

  const body = (await req.json()) as {
    name: string;
  };
  if (!body.name) return NextResponse.json({ message: 'Name is required' });

  const findRam = await prisma.ram.findFirst({
    where: {
      name: body.name,
    },
  });
  if (findRam)
    return NextResponse.json(
      { message: 'Ram already exists' },
      { status: 400 }
    );

  const ram = await prisma.ram.create({
    data: {
      name: body.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (!ram)
    return NextResponse.json({ message: 'Ram not created' }, { status: 500 });

  return NextResponse.json(ram);
}

export async function DELETE(req: NextRequest) {
  const user = await getUserSession();
  if (!user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== Role.ADMIN)
    return NextResponse.json({ message: 'No access' }, { status: 403 });

  const body = (await req.json()) as {
    name: string;
  };
  if (!body.name) return NextResponse.json({ message: 'Name is required' });

  const findRam = await prisma.ram.findFirst({
    where: {
      name: body.name,
    },
    include: {
      products: true,
    },
  });
  if (!findRam)
    return NextResponse.json(
      { message: 'Ram doesn`t exists' },
      { status: 400 }
    );

  if (findRam.products.length > 0) {
    return NextResponse.json(
      { message: 'Exists products with this ram' },
      { status: 400 }
    );
  }
  await prisma.ram.delete({
    where: {
      id: findRam.id,
    },
  });
  return NextResponse.json({ message: 'Ram deleted' }, { status: 200 });
}
