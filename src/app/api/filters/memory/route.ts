import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  const memory = await prisma.memory.findMany();
  return NextResponse.json(memory);
}
