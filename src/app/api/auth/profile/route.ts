'use server';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUserSession();
  try {
    if (!user) {
      return NextResponse.json(
        { message: '[USER UNAUTHORIZED] error' },
        { status: 401 }
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        name: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        password: false,
      },
    });
    if (!data) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log('[USER_GET] Server error', error);
    return NextResponse.json({ message: 'Cannot get user' }, { status: 500 });
  }
}
