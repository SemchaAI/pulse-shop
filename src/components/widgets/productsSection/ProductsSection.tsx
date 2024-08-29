import { ProductsList } from '../productsList/ProductsList';
import css from './productsSection.module.scss';
import { ICategory } from '@/app/page';

interface IProps {
  categories: ICategory[];
}

export const ProductsSection = ({ categories }: IProps) => {
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
