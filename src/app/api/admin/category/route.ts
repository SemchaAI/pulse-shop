import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//   const categories = await prisma.category.findMany();
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

  const findCategory = await prisma.category.findFirst({
    where: {
      name: body.name,
    },
  });
  if (findCategory)
    return NextResponse.json(
      { message: 'Category already exists' },
      { status: 400 }
    );

  const category = await prisma.category.create({
    data: {
      name: body.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (!category)
    return NextResponse.json(
      { message: 'Category not created' },
      { status: 500 }
    );

  return NextResponse.json(category);
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

  const findCategory = await prisma.category.findFirst({
    where: {
      name: body.name,
    },
    include: {
      products: true,
    },
  });
  if (!findCategory)
    return NextResponse.json(
      { message: 'Category doesn`t exists' },
      { status: 400 }
    );

  if (findCategory.products.length > 0) {
    return NextResponse.json(
      { message: 'Category has products' },
      { status: 400 }
    );
  }
  await prisma.category.delete({
    where: {
      id: findCategory.id,
    },
  });
  return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
}
