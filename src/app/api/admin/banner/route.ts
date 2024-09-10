import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { BannerSlide, Role } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) return NextResponse.json('Auth error', { status: 401 });
    if (session.role !== Role.ADMIN)
      return NextResponse.json('Access error', { status: 401 });

    const data = (await req.json()) as Omit<BannerSlide, 'id'>;
    const bannerSlide = await prisma.bannerSlide.create({
      data,
    });
    if (!bannerSlide)
      return NextResponse.json('bannerSlide not created', { status: 500 });

    return NextResponse.json({ bannerSlide }, { status: 200 });
  } catch (error) {
    console.log('[BANNER_POST] Server error', error);
    return NextResponse.json(
      { message: 'Cannot create Banner' },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) return NextResponse.json('Auth error', { status: 401 });
    if (session.role !== Role.ADMIN)
      return NextResponse.json('Access error', { status: 401 });

    const data = (await req.json()) as {
      id: number;
    };
    const bannerSlide = await prisma.bannerSlide.delete({
      where: {
        id: data.id,
      },
    });
    if (!bannerSlide)
      return NextResponse.json('bannerSlide not deleted', { status: 500 });

    return NextResponse.json({ bannerSlide }, { status: 200 });
  } catch (error) {
    console.log('[BANNER_DELETE] Server error', error);
    return NextResponse.json(
      { message: 'Cannot delete Banner' },
      { status: 500 }
    );
  }
}
