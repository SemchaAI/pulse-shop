import { prisma } from '@/prisma/prisma-client';

export const favoriteHelper = async (userId: number) => {
  let userFavorite = await prisma.favorite.findFirst({
    where: {
      userId,
    },
  });
  // console.log('userFavorite', userFavorite);
  if (!userFavorite) {
    userFavorite = await prisma.favorite.create({
      data: {
        userId,
      },
    });
  }

  return userFavorite;
};
