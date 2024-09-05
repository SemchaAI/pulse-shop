import { AddCategory, InfoList, DeleteCategory } from '@/components/entities';
import { Container } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
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
      <InfoList list={categories} />
      <AddCategory />
      <DeleteCategory />
    </Container>
  );
}
