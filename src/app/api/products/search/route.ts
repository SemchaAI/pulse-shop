import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.productItem.findMany({
    // include: {
    //   productItem: {
    //     where: {
    //       title: {
    //         contains: query,
    //         mode: 'insensitive',
    //       },
    //     },
    //     take: 1,
    //   },
    // },
    where: {
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
    include: {
      product: true,
    },
    take: 5,
  });
  return NextResponse.json(products);
}
