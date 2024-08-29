import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { favoriteHelper } from '@/utils/helpers';
//updateFavoriteTotal
import { CreateItem } from '@/models/cartFavor';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) return NextResponse.json({ items: [] });

    const userFavorite = await prisma.favorite.findFirst({
      where: {
        token,
      },
      include: {
        favoriteProduct: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
                color: true,
                memory: true,
                ram: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(userFavorite);
  } catch (error) {
    console.log('[FAVORITE_GET] Server error', error);
    return NextResponse.json(
      { message: 'Cannot get favorite' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let isNewToken = false;
    let token = req.cookies.get('token')?.value;

    if (!token) {
      isNewToken = true;
      token = crypto.randomUUID();
    }
    const userFavorite = await favoriteHelper(token);

    const data = (await req.json()) as CreateItem;
    const findFavoriteItem = await prisma.favoriteProduct.findFirst({
      where: {
        favoriteId: userFavorite.id,
        productItemId: data.productItemId,
      },
    });

    if (findFavoriteItem) {
      await prisma.favoriteProduct.delete({
        where: {
          id: findFavoriteItem.id,
        },
      });
    } else {
      await prisma.favoriteProduct.create({
        data: {
          favoriteId: userFavorite.id,
          productItemId: data.productItemId,
        },
      });
    }

    const favorite = await prisma.favorite.findFirst({
      where: {
        token,
      },
      include: {
        favoriteProduct: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
                color: true,
                memory: true,
                ram: true,
              },
            },
          },
        },
      },
    });

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    const resp = NextResponse.json(favorite);
    if (isNewToken) {
      resp.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return resp;
  } catch (error) {
    console.log('[FAVORITE_POST] Server error', error);
    return NextResponse.json(
      { message: 'Cannot create favorite' },
      { status: 500 }
    );
  }
}
