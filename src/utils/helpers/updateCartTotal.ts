import { prisma } from '@/prisma/prisma-client';

export const updateCartTotal = async (token: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      cartProduct: {
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

  if (!cart) return;

  const totalAmount = cart?.cartProduct.reduce((acc, item) => {
    return acc + item.productItem.price * item.quantity;
  }, 0);

  return await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      cartProduct: {
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
};
