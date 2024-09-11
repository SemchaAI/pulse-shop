import { prisma } from '@/prisma/prisma-client';
import { sendActivationMail } from '@/utils/mail';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
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
    const cookieStore = cookies();
    cookieStore.delete('newUser');
    return redirect('/login');
  } catch (error) {
    console.log(`[ACTIVATE USER] server error ${error}`);
    throw error;
  }
}
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const body = (await req.json()) as {
      id: string;
    };
    console.log(body.id);
    if (!body.id) return NextResponse.json({ message: 'Id is required' });

    const user = await prisma.user.findFirst({
      where: { id: Number(body.id) },
    });

    if (!user) return NextResponse.json({ message: 'User not found' });

    const code = await prisma.verificationCode.update({
      where: { userId: Number(body.id) },
      data: {
        code: randomUUID(),
      },
    });
    if (!code) {
      throw new Error('Code not updated');
    }

    const activationUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/activation?link=${code.code}`;

    sendActivationMail(user.email, activationUrl);

    const cookieStore = cookies();
    cookieStore.delete('newUser');

    return NextResponse.json(code);
  } catch (error) {
    console.log(`[UPDATE CODE] server error ${error}`);
    throw error;
  }
}
