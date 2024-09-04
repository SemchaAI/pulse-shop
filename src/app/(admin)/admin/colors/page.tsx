import { AddColor, InfoList, DeleteColor } from '@/components/entities';
import { Container } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Colors() {
  const colors = await prisma.color.findMany({
    select: {
      name: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
  return (
    <Container>
      <InfoList list={colors} />
      <AddColor />
      <DeleteColor />
    </Container>
  );
}
