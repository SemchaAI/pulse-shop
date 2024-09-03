import { Container } from '@/components/shared';
import { Filters, ProductsSection } from '@/components/widgets';

import { findProductsWithParams } from '@/utils/helpers/findProductsWithParams';
import css from '../assets/home/page.module.scss';
import { Box } from 'lucide-react';
import { IParams } from '@/models/searchWithParams';

export default async function Accessories({
  searchParams,
}: {
  searchParams: IParams;
}) {
  //@categories
  const products = await findProductsWithParams(searchParams, 'Accessories');
  if (!products)
    return (
      <div className={css.emptyContainer}>
        <p>No Accessories found</p>
        <Box size={36} />
      </div>
    );

  return (
    <>
      <Container>
        <div className={css.container}>
          <Filters />
          <ProductsSection
            version="default"
            categories={[products]}
          />
        </div>
      </Container>
    </>
  );
}
