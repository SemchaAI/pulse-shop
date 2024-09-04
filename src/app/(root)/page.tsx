import { Container } from '@/components/shared';
import { Filters, ProductsSection, TopBar } from '@/components/widgets';

import { findCategoriesWithParams } from '@/utils/helpers/findCategoriesWithParams';
import css from './assets/home/page.module.scss';
import { HeaderBanner } from '@/components/entities';
import { OPTIONS, SLIDES } from '@/utils/consts/HeaderBanner';
import { IParams } from '@/models/searchWithParams';

export default async function Home({
  searchParams,
}: {
  searchParams: IParams;
}) {
  //@categories
  const categories = await findCategoriesWithParams(searchParams);
  return (
    <>
      <TopBar categories={categories} />
      <HeaderBanner
        slides={SLIDES}
        options={OPTIONS}
      />
      <Container>
        <div className={css.container}>
          <Filters />
          <ProductsSection
            version="home"
            categories={categories}
          />
        </div>
      </Container>
    </>
  );
}
