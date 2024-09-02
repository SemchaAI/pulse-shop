'use server';
import { prisma } from '@/prisma/prisma-client';
import { Role } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';

export async function registerGuest() {
  try {
    const uuid = randomUUID();
    const newUser = await prisma.user.create({
      data: {
        name: `Guest ${uuid}`,
        email: `guest@${uuid}.com`,
        password: hashSync(randomUUID(), 10),
        // token: uuid,
        verified: new Date(),
        role: Role.GUEST,
      },
    });
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  } catch (error) {
    console.log(`[GUEST USER] server error ${error}`);
    throw error;
  }
}
