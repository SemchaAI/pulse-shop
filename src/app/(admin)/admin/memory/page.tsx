import { AddMemory, DeleteMemory, InfoList } from '@/components/entities';
import { Container } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Colors() {
  const memory = await prisma.memory.findMany({
    select: {
      name: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      products: {
        _count: 'desc',
      },
    },
  });

  return (
    <Container>
      <InfoList list={memory} />
      <AddMemory />
      <DeleteMemory />
    </Container>
  );
}
