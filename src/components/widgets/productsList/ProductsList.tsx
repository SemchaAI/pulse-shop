'use client';
import css from './productsList.module.scss';
import { ProductCard } from '@/components/entities';
import { ICategory } from '@/models/searchWithParams';

interface IProps {
  category: ICategory;
}

export const ProductsList = ({ category }: IProps) => {
  return (
    <div className={css.container}>
      <h3 className={css.title}>{category.name}</h3>
      <ul className={css.list}>
        {category.products.map((product) =>
          product.productItem.map((item) => {
            return (
              <ProductCard
                key={item.id}
                item={item}
                product={product}
              />
            );
          })
        )}
      </ul>
    </div>
  );
};
