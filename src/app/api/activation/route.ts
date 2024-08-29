import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const activationLink = req.nextUrl.searchParams.get('link');
  try {
    if (!activationLink) {
      throw new Error('Activation link not found');
    }

    const code = await prisma.verificationCode.findFirst({
      where: {
        code: activationLink,
      },
    });
    if (!code) {
      throw new Error('Activation code not found');
    }

    const user = await prisma.user.update({
      where: { id: code.userId },
      data: {
        verified: new Date(),
      },
    });

    await prisma.verificationCode.delete({
      where: { id: code.id },
    });

    if (!user) {
      throw new Error('User not found 2');
    }

    return redirect('/login');
  } catch (error) {
    console.log(`[ACTIVATE USER] server error ${error}`);
    throw error;
  }
}
