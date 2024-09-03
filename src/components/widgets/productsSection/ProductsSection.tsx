import { ICategory } from '@/models/searchWithParams';
import css from './productsSection.module.scss';
import { HomeProductsList, ProductsList } from '@/components/widgets';

interface IProps {
  categories: ICategory[];
  version?: 'home' | 'default';
}

export const ProductsSection = ({
  categories,
  version = 'default',
}: IProps) => {
  if (version === 'home') {
    return (
      <section className={css.section}>
        {categories.map(
          (category) =>
            category.products.length > 0 && (
              <HomeProductsList
                key={category.id}
                category={category}
              />
            )
        )}
      </section>
    );
  }
  return (
    <section className={css.section}>
      {categories.map(
        (category) =>
          category.products.length > 0 && (
            <ProductsList
              key={category.id}
              category={category}
            />
          )
      )}
    </section>
  );
};
