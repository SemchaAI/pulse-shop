import { RatingForm } from '@/models/forms';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json(
        { message: '[USER UNAUTHORIZED] error' },
        { status: 401 }
      );
    }
    const body = (await req.json()) as RatingForm;

    if (!body) {
      return NextResponse.json({ error: 'No body' });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: body.productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' });
    }
    const rate = await prisma.rating.create({
      data: {
        message: body.message,
        rate: body.rate,
        name: body.name,
        userId: body.userId,
        productId: body.productId,
      },
    });
    if (!rate) {
      return NextResponse.json({ error: 'Rate not created' });
    }
    const allProductRates = await prisma.rating.findMany({
      where: {
        productId: body.productId,
      },
    });
    const totalRates = allProductRates.length;
    const totalRate = allProductRates.reduce((acc, cur) => acc + cur.rate, 0);

    const updatedProduct = await prisma.product.update({
      where: {
        id: body.productId,
      },
      data: {
        totalRating: totalRate / totalRates,
      },
    });
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not updated' });
    }

    return NextResponse.json({ message: 'Rate created' });
  } catch (error) {
    console.log('[RATE POST] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json(
        { message: '[USER UNAUTHORIZED] error' },
        { status: 401 }
      );
    }
    const body = (await req.json()) as RatingForm;

    if (!body) {
      return NextResponse.json({ error: 'No body' });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: body.productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' });
    }
    const rate = await prisma.rating.update({
      where: {
        userId_productId: {
          userId: body.userId,
          productId: body.productId,
        },
      },
      data: {
        message: body.message,
        rate: body.rate,
        name: body.name,
        userId: body.userId,
        productId: body.productId,
      },
    });
    if (!rate) {
      return NextResponse.json({ error: 'Rate not created' });
    }
    const allProductRates = await prisma.rating.findMany({
      where: {
        productId: body.productId,
      },
    });
    const totalRates = allProductRates.length;
    const totalRate = allProductRates.reduce((acc, cur) => acc + cur.rate, 0);

    const updatedProduct = await prisma.product.update({
      where: {
        id: body.productId,
      },
      data: {
        totalRating: totalRate / totalRates,
      },
    });
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not updated' });
    }

    return NextResponse.json({ message: 'Rate created' });
  } catch (error) {
    console.log('[RATE POST] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('query');
    const productId = query?.split('productId=')[1].split('&')[0];
    const page = query?.split('page=')[1];
    if (!query) {
      return NextResponse.json({ error: 'No productId' });
    }

    const RatesByPage = 5;
    const CurrentPage = Number(page);
    const offset = (CurrentPage - 1) * RatesByPage;

    const totalRates = await prisma.rating.count({
      where: {
        productId: Number(productId),
      },
    });

    const rates = await prisma.rating.findMany({
      where: {
        productId: Number(productId),
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: RatesByPage,
    });
    return NextResponse.json({
      rates,
      totalPages: Math.ceil(totalRates / RatesByPage),
    });
  } catch (error) {
    console.log('[RATE GET] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
