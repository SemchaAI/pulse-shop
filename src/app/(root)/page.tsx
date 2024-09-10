import { Container } from '@/components/shared';
import { Filters, ProductsSection, TopBar } from '@/components/widgets';

import { findCategoriesWithParams } from '@/utils/helpers/findCategoriesWithParams';
import css from '@/app/assets/home/page.module.scss';
import { HeaderBanner } from '@/components/entities';
import { OPTIONS } from '@/utils/consts/HeaderBanner';
import { IParams } from '@/models/searchWithParams';
import { prisma } from '@/prisma/prisma-client';

export default async function Home({
  searchParams,
}: {
  searchParams: IParams;
}) {
  //@categories
  const categories = await findCategoriesWithParams(searchParams);
  const slides = await prisma.bannerSlide.findMany();
  return (
    <>
      <TopBar categories={categories} />
      <HeaderBanner
        slides={slides}
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
