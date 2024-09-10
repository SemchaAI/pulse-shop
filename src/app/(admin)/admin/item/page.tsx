import {
  AddProductItem,
  AddThumbnails,
  DeleteProductItem,
  DeleteThumbnails,
  InfoList,
} from '@/components/entities';
import { AdminSearch, UploadThing } from '@/components/features';
import { Container } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function ProductItem() {
  const colors = await prisma.color.findMany();
  const memory = await prisma.memory.findMany();
  const ram = await prisma.ram.findMany();
  const products = await prisma.product.findMany({
    include: {
      category: true,
      productItem: true,
    },
  });
  return (
    <Container>
      <UploadThing />
      <AdminSearch products={products} />
      <div style={{ display: 'flex', gap: '40px' }}>
        <AddProductItem
          colors={colors}
          memory={memory}
          ram={ram}
        />
        <DeleteProductItem
          colors={colors}
          memory={memory}
          ram={ram}
        />
      </div>
      <div style={{ display: 'flex', gap: '40px' }}>
        <AddThumbnails />
        <DeleteThumbnails />
      </div>
    </Container>
  );
}
