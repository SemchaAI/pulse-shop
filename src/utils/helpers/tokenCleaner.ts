'use server';
import { prisma } from '@/prisma/prisma-client';
import { cookies } from 'next/headers';

export const tokenCleaner = async (userToken: string) => {
  const currToken = cookies().get('token');
  if (currToken && currToken.value !== userToken) {
    const userCart = await prisma.cart.findUnique({
      where: {
        token: currToken.value,
      },
    });
    if (userCart) {
      await prisma.cartProduct.deleteMany({
        where: {
          cartId: userCart?.id,
        },
      });
      await prisma.cart.delete({
        where: {
          token: currToken.value,
        },
      });
    }

    const userFavorite = await prisma.favorite.findUnique({
      where: {
        token: currToken.value,
      },
    });
    if (userFavorite) {
      console.log('userFavorite', userFavorite);
      await prisma.favoriteProduct.deleteMany({
        where: {
          favoriteId: userFavorite?.id,
        },
      });
      await prisma.favorite.delete({
        where: {
          token: currToken.value,
        },
      });
    }

    await prisma.token.delete({
      where: {
        token: currToken.value,
      },
    });

    // cookies().delete('token');
    cookies().set('token', userToken);
  } else {
    cookies().set('token', userToken);
  }
};
