import {
  AddProduct,
  DeleteProduct,
  DeleteProductInfo,
  ProductInfoForm,
} from '@/components/entities';
import { AdminSearch } from '@/components/features';
import { Container } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Product() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    include: {
      category: true,
      productItem: true,
    },
  });
  return (
    <Container>
      <AdminSearch products={products} />
      <div style={{ display: 'flex', gap: '40px' }}>
        <DeleteProduct />
        <AddProduct categories={categories} />
      </div>
      <div style={{ display: 'flex', gap: '40px' }}>
        <ProductInfoForm />
        <DeleteProductInfo />
      </div>
    </Container>
  );
}
