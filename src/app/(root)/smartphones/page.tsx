import { Container } from '@/components/shared';
import { Filters, ProductsSection } from '@/components/widgets';

import { findProductsWithParams } from '@/utils/helpers/findProductsWithParams';
import css from '@/app/assets/home/page.module.scss';
import { IParams } from '@/models/searchWithParams';
import { Box } from 'lucide-react';

export default async function Smartphones({
  searchParams,
}: {
  searchParams: IParams;
}) {
  //@categories
  const products = await findProductsWithParams(searchParams, 'Smartphones');
  if (!products)
    return (
      <div className={css.emptyContainer}>
        <p>No Smartphones found</p>
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
