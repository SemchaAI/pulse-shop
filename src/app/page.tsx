import { Container } from '@/components/shared';
import { Filters, ProductsSection, TopBar } from '@/components/widgets';

import {
  findProductsWithParams,
  type IParams,
} from '@/utils/helpers/findProductsWithParams';
import { Category, Product, ProductItem } from '@prisma/client';
import css from './assets/home/page.module.scss';

interface IProduct extends Product {
  productItem: ProductItem[];
}
export interface ICategory extends Category {
  products: IProduct[];
}

export default async function Home({
  searchParams,
}: {
  searchParams: IParams;
}) {
  //@categories
  const categories = await findProductsWithParams(searchParams);
  return (
    <>
      <TopBar categories={categories} />
      <Container>
        <div className={css.container}>
          <Filters />
          <ProductsSection categories={categories} />
        </div>
      </Container>
    </>
  );
}
