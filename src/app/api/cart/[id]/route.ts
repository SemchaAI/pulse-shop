import { prisma } from '@/prisma/prisma-client';
import { updateCartTotal } from '@/utils/helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Cart token not found' },
        { status: 404 }
      );
    }

    const cartProduct = await prisma.cartProduct.findFirst({
      where: {
        id,
      },
    });
    if (!cartProduct) {
      return NextResponse.json(
        { message: 'Cart product not found' },
        { status: 404 }
      );
    }

    await prisma.cartProduct.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });
    const updatedCart = await updateCartTotal(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log('[CART_PATCH] Something went wrong', error);
    return NextResponse.json(
      { message: 'Something went wrong while updating cart' },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Cart token not found' },
        { status: 404 }
      );
    }

    const cartProduct = await prisma.cartProduct.findFirst({
      where: {
        id,
      },
    });
    if (!cartProduct) {
      return NextResponse.json(
        { message: 'Cart product not found' },
        { status: 404 }
      );
    }

    await prisma.cartProduct.delete({
      where: {
        id,
      },
    });
    const updatedCart = await updateCartTotal(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.log('[CART_DELETE] Something went wrong', error);
    return NextResponse.json(
      { message: 'Something went wrong while delete cart product' },
      { status: 500 }
    );
  }
}
