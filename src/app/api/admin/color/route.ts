import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//   const categories = await prisma.color.findMany();
//   return NextResponse.json(categories);
// }

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

  const findColor = await prisma.color.findFirst({
    where: {
      name: body.name,
    },
  });
  if (findColor)
    return NextResponse.json(
      { message: 'Color already exists' },
      { status: 400 }
    );

  const color = await prisma.color.create({
    data: {
      name: body.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (!color)
    return NextResponse.json({ message: 'Color not created' }, { status: 500 });

  return NextResponse.json(color);
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

  const findColor = await prisma.color.findFirst({
    where: {
      name: body.name,
    },
    include: {
      products: true,
    },
  });
  if (!findColor)
    return NextResponse.json(
      { message: 'Color doesn`t exists' },
      { status: 400 }
    );

  if (findColor.products.length > 0) {
    return NextResponse.json(
      { message: 'Color has products' },
      { status: 400 }
    );
  }
  await prisma.color.delete({
    where: {
      id: findColor.id,
    },
  });
  return NextResponse.json({ message: 'Color deleted' }, { status: 200 });
}
