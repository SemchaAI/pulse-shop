'use client';
import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { useCategoryStore } from '@/stores';

import type { ICategory } from '@/app/page';

import css from './productsList.module.scss';
import { ProductCard } from '@/components/entities';

interface IProps {
  category: ICategory;
}

export const ProductsList = ({ category }: IProps) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.9,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(category.id);
    }
  }, [category.id, intersection?.isIntersecting, category.name]);

  return (
    <div
      ref={intersectionRef}
      id={category.name}
      className={css.container}
    >
      <h3 className={css.title}>{category.name}</h3>
      <ul className={css.list}>
        {category.products.map((product) =>
          product.productItem.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              product={product}
            />
          ))
        )}
      </ul>
    </div>
  );
};
