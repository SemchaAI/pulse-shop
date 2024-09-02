import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { cartHelper, updateCartTotal } from '@/utils/helpers';
import { CreateItem } from '@/models/cartFavor';
import { getUserSession } from '@/utils/helpers/getUserSession';

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession();

    if (!session) return NextResponse.json({ items: [] });

    const userCart = await prisma.cart.findFirst({
      where: {
        userId: Number(session.id),
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
    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Cannot get cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) return NextResponse.json('Auth error', { status: 401 });
    const userCart = await cartHelper(Number(session.id));
    console.log('userCart', userCart);
    const data = (await req.json()) as CreateItem;
    const findCartItem = await prisma.cartProduct.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
    });
    console.log('findCartItem', findCartItem);

    if (findCartItem) {
      await prisma.cartProduct.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartProduct.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
        },
      });
    }

    const updatedCart = await updateCartTotal(Number(session.id));

    const resp = NextResponse.json(updatedCart);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Cannot create cart' },
      { status: 500 }
    );
  }
}
