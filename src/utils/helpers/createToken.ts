import { prisma } from '@/prisma/prisma-client';
import { NextRequest } from 'next/server';

export const createToken = async (req: NextRequest) => {
  let isNewToken = false;
  let token = req.cookies.get('token')?.value;
  console.log('token', token);

  if (!token) {
    isNewToken = true;
    token = crypto.randomUUID();

    const userToken = await prisma.token.create({
      data: {
        token,
      },
    });
    if (!userToken) throw new Error('Cannot create token');
  }

  return { isNewToken, token };
};
