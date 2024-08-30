import { prisma } from '@/prisma/prisma-client';

export const favoriteHelper = async (token: string) => {
  let userFavorite = await prisma.favorite.findFirst({
    where: {
      token,
    },
  });
  console.log('userFavorite', userFavorite);
  if (!userFavorite) {
    userFavorite = await prisma.favorite.create({
      data: {
        token,
      },
    });
  }

  return userFavorite;
};
