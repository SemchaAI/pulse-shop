import { AddRam, DeleteRam, InfoList } from '@/components/entities';
import { Container } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Colors() {
  const ram = await prisma.ram.findMany({
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
      <InfoList list={ram} />
      <AddRam />
      <DeleteRam />
    </Container>
  );
}
