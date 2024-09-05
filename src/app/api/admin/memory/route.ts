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

  const findMemory = await prisma.memory.findFirst({
    where: {
      name: body.name,
    },
  });
  if (findMemory)
    return NextResponse.json(
      { message: 'Memory already exists' },
      { status: 400 }
    );

  const memory = await prisma.memory.create({
    data: {
      name: body.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (!memory)
    return NextResponse.json(
      { message: 'Memory not created' },
      { status: 500 }
    );

  return NextResponse.json(memory);
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

  const findMemory = await prisma.memory.findFirst({
    where: {
      name: body.name,
    },
    include: {
      products: true,
    },
  });
  if (!findMemory)
    return NextResponse.json(
      { message: 'Memory doesn`t exists' },
      { status: 400 }
    );

  if (findMemory.products.length > 0) {
    return NextResponse.json(
      { message: 'Exists products with this memory' },
      { status: 400 }
    );
  }
  await prisma.memory.delete({
    where: {
      id: findMemory.id,
    },
  });
  return NextResponse.json({ message: 'Memory deleted' }, { status: 200 });
}
