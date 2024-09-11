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

  const newProductItem = await prisma.productItem.create({
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
  if (!newProductItem)
    return NextResponse.json(
      { message: 'Product item not created' },
      { status: 400 }
    );
  // const product = await prisma.product.findUnique({
  //   where: {
  //     id: Number(body.productId),
  //   },
  // });
  const productUpdated = await prisma.product.update({
    where: {
      id: Number(body.productId),
    },
    data: {
      colors: {
        connect: {
          id: Number(body.colorId),
        },
      },
      memory: {
        connect: {
          id: Number(body.memoryId),
        },
      },
      ram: {
        connect: {
          id: Number(body.ramId),
        },
      },
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

  const findProducts = await prisma.productItem.findMany({
    where: {
      productId: Number(body.productId),
      colorId: body.colorId ? Number(body.colorId) : null,
    },
  });

  if (findProducts.length === 1) {
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
      // console.log('res', res);
    }
  }

  await prisma.productItem.delete({
    where: { id: findProduct.id },
  });
  const productItems = await prisma.productItem.findMany({
    where: {
      productId: Number(body.productId),
    },
  });
  const colors: (number | null)[] = [];
  const ram: (number | null)[] = [];
  const memory: (number | null)[] = [];
  let colorFlag = false;
  let ramFlag = false;
  let memoryFlag = false;

  productItems.map((item) => {
    colors.push(item.colorId);
    ram.push(item.ramId);
    memory.push(item.memoryId);
  });

  if (!colors.includes(Number(body.colorId))) {
    colorFlag = true;
  }
  if (!ram.includes(Number(body.ramId))) {
    ramFlag = true;
  }
  if (!memory.includes(Number(body.memoryId))) {
    memoryFlag = true;
  }

  await prisma.product.update({
    where: {
      id: Number(body.productId),
    },
    data: {
      ...(colorFlag && {
        colors: { disconnect: [{ id: Number(body.colorId) }] },
      }),
      ...(memoryFlag && {
        memory: { disconnect: [{ id: Number(body.memoryId) }] },
      }),
      ...(ramFlag && { ram: { disconnect: [{ id: Number(body.ramId) }] } }),
    },
  });

  return NextResponse.json(
    { message: 'Product item fully deleted' },
    { status: 200 }
  );
}
