import { prisma } from '@/prisma/prisma-client';

export const cartHelper = async (userId: number) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  return userCart;
};
