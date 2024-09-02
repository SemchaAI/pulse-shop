import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { favoriteHelper } from '@/utils/helpers';
//updateFavoriteTotal
import { CreateItem } from '@/models/cartFavor';
import { getUserSession } from '@/utils/helpers/getUserSession';

export async function GET(req: NextRequest) {
  try {
    // const token = req.cookies.get('token')?.value;
    // const { token, tokenState } = await serverTokenMiddleware(req);

    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        { message: 'Favorite id not found' },
        { status: 404 }
      );
    }

    // if (tokenState === TokenState.NEW) {
    //   const resp = NextResponse.json({ items: [] });
    //   resp.cookies.set('token', token, {
    //     httpOnly: true,
    //     maxAge: 60 * 60 * 24 * 7,
    //   });
    //   return resp;
    // }
    const userFavorite = await prisma.favorite.findFirst({
      where: {
        userId: Number(session.id),
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
    if (!userFavorite) {
      return NextResponse.json({ items: [] });
    }
    // if (tokenState === TokenState.REFRESHED) {
    //   const resp = NextResponse.json(userFavorite);
    //   resp.cookies.set('token', token, {
    //     httpOnly: true,
    //     maxAge: 60 * 60 * 24 * 7,
    //   });
    //   return resp;
    // }
    return NextResponse.json(userFavorite);
  } catch (error) {
    console.log('[FAVORITE_GET] Server error', error);
    return NextResponse.json(
      { message: 'Cannot get favorite' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const currUser = await getUserSession();
    // if (currUser) {
    //   const user = await prisma.user.findUnique({
    //     where: {
    //       id: Number(currUser.id),
    //     },
    //   });
    //   if (!user) {
    //     throw new Error('User not found');
    //   }
    //   req.cookies.set('token', user.token);
    // }
    // const { isNewToken, token } = await createToken(req);

    // const { token, tokenState } = await serverTokenMiddleware(req);
    // console.log('favorite token', token);

    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        { message: 'Favorite id not found' },
        { status: 404 }
      );
    }

    const userFavorite = await favoriteHelper(Number(session.id));

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
        userId: Number(session.id),
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
    // if (tokenState === TokenState.REFRESHED || tokenState === TokenState.NEW) {
    //   resp.cookies.set('token', token, {
    //     httpOnly: true,
    //     maxAge: 60 * 60 * 24 * 7,
    //   });
    // }
    return resp;
  } catch (error) {
    console.log('[FAVORITE_POST] Server error', error);
    return NextResponse.json(
      { message: 'Cannot create favorite' },
      { status: 500 }
    );
  }
}
