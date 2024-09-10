import { deleteUTFiles } from '@/app/actions';
import { IDeleteProductItem, IProductItem } from '@/models/product';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

export async function POST(req: NextRequest) {
  const user = await getUserSession();
  if (!user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  if (user.role !== Role.ADMIN)
    return NextResponse.json({ message: 'No access' }, { status: 403 });

  const body = (await req.json()) as IProductItem;
  if (!body) return NextResponse.json({ message: 'Data is required' });

  const productInfo = await prisma.productItem.findFirst({
    where: {
      productId: Number(body.productId),
      colorId: Number(body.colorId),
      memoryId: Number(body.memoryId),
      ramId: Number(body.ramId),
    },
  });

  if (productInfo)
    return NextResponse.json(
      { message: 'Product item already exists' },
      {
        status: 400,
      }
    );

  await prisma.productItem.create({
    data: {
      title: body.title,
      cnt: Number(body.cnt),
      img: body.img,
      oldPrice: Number(body.oldPrice),
      price: Number(body.price),

      productId: Number(body.productId),
      colorId: body.colorId ? Number(body.colorId) : null,
      memoryId: body.memoryId ? Number(body.memoryId) : null,
      ramId: body.ramId ? Number(body.ramId) : null,

      createdAt: new Date(),
      updatedAt: new Date(),
    },
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

  const body = (await req.json()) as IDeleteProductItem;
  if (!body.productId)
    return NextResponse.json({ message: 'productId is required' });

  const findProduct = await prisma.productItem.findFirst({
    where: {
      productId: Number(body.productId),
      colorId: body.colorId ? Number(body.colorId) : null,
      memoryId: body.memoryId ? Number(body.memoryId) : null,
      ramId: body.ramId ? Number(body.ramId) : null,
    },
  });
  if (!findProduct)
    return NextResponse.json(
      { message: 'ProductItem doesn`t exists' },
      { status: 400 }
    );

  await prisma.cartProduct.deleteMany({
    where: {
      productItemId: findProduct.id,
    },
  });
  await prisma.favoriteProduct.deleteMany({
    where: {
      productItemId: findProduct.id,
    },
  });
  const images = await prisma.productImages.findFirst({
    where: {
      productItemId: findProduct.id,
    },
  });

  const utapi = new UTApi();

  if (images) {
    await utapi.deleteFiles([findProduct.img, ...images.thumbnails]);
    await prisma.productImages.deleteMany({
      where: {
        productItemId: findProduct.id,
      },
    });
  } else {
    const res = await utapi.deleteFiles([findProduct.img]);
    console.log('res', res);
  }

  await prisma.productItem.delete({
    where: { id: findProduct.id },
  });

  return NextResponse.json(
    { message: 'Product item fully deleted' },
    { status: 200 }
  );
}
