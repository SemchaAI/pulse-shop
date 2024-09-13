'use client';
import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { useCategoryStore } from '@/stores';

import css from './productsList.module.scss';
import { ProductCard } from '@/components/entities';
import { ICategory } from '@/models/searchWithParams';
import { MainLink } from '@/components/shared';

interface IProps {
  category: ICategory;
}

export const HomeProductsList = ({ category }: IProps) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  //max two types of one product
  const variants = 2;
  //max of individual products
  // variants * size = max items rendered in category
  const size = 6;

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
        {category.products.slice(0, size).map((product) =>
          product.productItem.slice(0, variants).map((item) => {
            // console.log('item', item);
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
      <MainLink
        className={css.seeAll}
        mode="button"
        version="contain"
        to={`/${category.name.toLowerCase()}`}
        label={`to ${category.name} page`}
      >
        More {category.name}
      </MainLink>
    </div>
  );
};
