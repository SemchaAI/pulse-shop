'use server';
import { prisma } from '@/prisma/prisma-client';
import type { Token } from '@prisma/client';
import { cookies } from 'next/headers';

export const tokenHelper = async () => {
  const currToken = cookies().get('token')?.value;
  let token;
  if (currToken) {
    token = await prisma.token.findUnique({
      where: {
        token: currToken,
      },
    });
  } else {
    token = await prisma.token.create({
      data: {
        token: crypto.randomUUID(),
      },
    });
  }

  return token as Token;
};
