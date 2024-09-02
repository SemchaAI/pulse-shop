import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        { message: 'Favorite id not found' },
        { status: 404 }
      );
    }

    const favoriteProduct = await prisma.favoriteProduct.findFirst({
      where: {
        id,
      },
    });
    if (!favoriteProduct) {
      return NextResponse.json(
        { message: 'Favorite product not found' },
        { status: 404 }
      );
    }

    await prisma.favoriteProduct.delete({
      where: {
        id,
      },
    });
    const updatedFavorite = await prisma.favorite.findFirst({
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
    return NextResponse.json(updatedFavorite);
  } catch (error) {
    console.log('[FAVORITE_DELETE] Something went wrong', error);
    return NextResponse.json(
      { message: 'Something went wrong while delete favorite product' },
      { status: 500 }
    );
  }
}
