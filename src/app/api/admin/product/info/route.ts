import { IInfoProduct } from '@/models/product';
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

  const body = (await req.json()) as IInfoProduct;
  if (!body.info || !body.productId)
    return NextResponse.json({ message: 'Data is required' }, { status: 400 });

  body.info.forEach(async (item) => {
    const productInfo = await prisma.productInfo.findFirst({
      where: {
        productId: Number(body.productId),
        title: item.title,
        description: item.description,
      },
    });

    if (productInfo)
      return NextResponse.json(
        { message: 'Product info exists' },
        {
          status: 400,
        }
      );

    await prisma.productInfo.create({
      data: {
        ...item,
        productId: Number(body.productId),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  });

  return NextResponse.json(
    { message: 'Product info`s created' },
    { status: 200 }
  );
}
export async function DELETE(req: NextRequest) {
  const user = await getUserSession();
  if (!user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== Role.ADMIN)
    return NextResponse.json({ message: 'No access' }, { status: 403 });

  const body = (await req.json()) as {
    productId: string;
  };
  if (!body.productId)
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });

  const productInfo = await prisma.productInfo.findFirst({
    where: {
      productId: Number(body.productId),
    },
  });

  if (!productInfo)
    return NextResponse.json(
      { message: 'Product info not found' },
      {
        status: 400,
      }
    );

  await prisma.productInfo.deleteMany({
    where: {
      productId: Number(body.productId),
    },
  });

  return NextResponse.json(
    { message: 'Product info`s deleted' },
    { status: 200 }
  );
}
