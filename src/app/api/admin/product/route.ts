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
    description: string;
    categoryId: string;
  };
  if (!body.description || !body.categoryId)
    return NextResponse.json({ message: 'Data is required' });

  // const findProduct= await prisma.product.findFirst({
  //   where: {
  //     name: body.name,
  //   },
  // });
  // if (findRam)
  //   return NextResponse.json(
  //     { message: 'Product already exists' },
  //     { status: 400 }
  //   );

  const product = await prisma.product.create({
    data: {
      description: body.description,
      categoryId: Number(body.categoryId),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  if (!product)
    return NextResponse.json(
      { message: 'Product not created' },
      { status: 500 }
    );

  return NextResponse.json(product);
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
    return NextResponse.json({ message: 'productId is required' });

  const findProduct = await prisma.product.findFirst({
    where: {
      id: Number(body.productId),
    },
    include: {
      productItem: {
        include: {
          cartProduct: true,
          FavoriteProduct: true,
          productImages: true,
        },
      },
      productInfo: true,
      rating: true,
    },
  });
  if (!findProduct)
    return NextResponse.json(
      { message: 'Product doesn`t exists' },
      { status: 400 }
    );

  await prisma.cartProduct.deleteMany({
    where: {
      productItemId: {
        in: findProduct.productItem.map((item) => item.id),
      },
    },
  });
  await prisma.favoriteProduct.deleteMany({
    where: {
      productItemId: {
        in: findProduct.productItem.map((item) => item.id),
      },
    },
  });
  await prisma.productImages.deleteMany({
    where: {
      productItemId: {
        in: findProduct.productItem.map((item) => item.id),
      },
    },
  });
  await prisma.productInfo.deleteMany({ where: { id: findProduct.id } });
  await prisma.rating.deleteMany({ where: { id: findProduct.id } });
  await prisma.productItem.deleteMany({
    where: {
      id: {
        in: findProduct.productItem.map((item) => item.id),
      },
    },
  });

  await prisma.product.delete({
    where: { id: Number(body.productId) },
  });

  return NextResponse.json(
    { message: 'Product fully deleted' },
    { status: 200 }
  );
}
