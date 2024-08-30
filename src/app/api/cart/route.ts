import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { cartHelper, createToken, updateCartTotal } from '@/utils/helpers';
import { CreateItem } from '@/models/cartFavor';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) return NextResponse.json({ items: [] });

    const userCart = await prisma.cart.findFirst({
      where: {
        token: token,
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
    const { isNewToken, token } = await createToken(req);
    const userCart = await cartHelper(token);

    const data = (await req.json()) as CreateItem;
    const findCartItem = await prisma.cartProduct.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
    });

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

    const updatedCart = await updateCartTotal(token);

    const resp = NextResponse.json(updatedCart);
    if (isNewToken) {
      resp.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json(
      { message: 'Cannot create cart' },
      { status: 500 }
    );
  }
}
