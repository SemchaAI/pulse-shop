'use server';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from './getUserSession';

export const favoriteHelper = async (token: string) => {
  let userFavorite = await prisma.favorite.findFirst({
    where: {
      token,
    },
  });

  if (!userFavorite) {
    userFavorite = await prisma.favorite.create({
      data: {
        token,
      },
    });
    //isUserLoggedIn
    // const user = await getUserSession();
    // if(user) {
    //   userFavorite = await prisma.favorite.update({
    //     where: {
    //       id: userFavorite.id,
    //     },
    //     data: {
    //       userId: Number(user.id),
    //     },
    //   });
    // }
  }

  return userFavorite;
};
