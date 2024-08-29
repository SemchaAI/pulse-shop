import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';

  const queryProductId = query.split('productId=')[1].split('&')[0];
  const queryColorId = query.split('colorId=')[1].split('&')[0];
  const queryMemoryId = query.split('memoryId=')[1].split('&')[0];
  const queryRamId = query.split('ramId=')[1].split('&')[0];

  let productVariant;

  if (queryMemoryId.length === 0 && queryRamId.length === 0) {
    productVariant = await prisma.product.findFirst({
      include: {
        productItem: {
          where: {
            colorId: Number(queryColorId),
          },
        },
      },
      where: {
        id: Number(queryProductId),
      },
    });
  } else {
    productVariant = await prisma.product.findFirst({
      include: {
        productItem: {
          where: {
            colorId: Number(queryColorId),
            memoryId: Number(queryMemoryId),
            ramId: Number(queryRamId),
          },
        },
      },
      where: {
        id: Number(queryProductId),
      },
    });
  }

  return NextResponse.json(productVariant);
}
