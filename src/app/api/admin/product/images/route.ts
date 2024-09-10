import { deleteUTFiles } from '@/app/actions';
import { IProductThumbnails } from '@/models/product';
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

  const body = (await req.json()) as IProductThumbnails;
  if (!body) return NextResponse.json({ message: 'Data is required' });

  const productInfo = await prisma.productImages.findFirst({
    where: {
      productItemId: Number(body.productItemId),
    },
  });

  if (productInfo)
    return NextResponse.json(
      { message: 'Product images already exists' },
      {
        status: 400,
      }
    );

  const images = await prisma.productImages.create({
    data: {
      productItemId: Number(body.productItemId),
      thumbnails: JSON.parse(body.thumbnails),
    },
  });
  if (!images)
    return NextResponse.json(
      { message: 'Product images not created' },
      { status: 500 }
    );

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

  const body = (await req.json()) as { productItemId: string };
  if (!body.productItemId)
    return NextResponse.json({ message: 'productItemId is required' });

  const findProduct = await prisma.productItem.findFirst({
    where: {
      id: Number(body.productItemId),
    },
  });
  if (!findProduct)
    return NextResponse.json(
      { message: 'ProductItem doesn`t exists' },
      { status: 400 }
    );

  const images = await prisma.productImages.findFirst({
    where: {
      productItemId: findProduct.id,
    },
  });

  if (!images)
    return NextResponse.json({ message: 'No images' }, { status: 400 });

  const utapi = new UTApi();

  await utapi.deleteFiles(images.thumbnails);
  await prisma.productImages.delete({
    where: {
      productItemId: findProduct.id,
    },
  });

  return NextResponse.json(
    { message: 'Product thumbnails deleted' },
    { status: 200 }
  );
}
