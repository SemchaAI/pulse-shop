'use client';
import qs from 'qs';
import { api } from '@/services/api/baseApi';
import {
  Category,
  Color,
  Memory,
  Product,
  ProductItem,
  Ram,
} from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
interface IProps {
  product: Product & {
    memory: Memory[];
    colors: Color[];
    ram: Ram[];
    category: Category;
    productItem: ProductItem[];
  };
  productItem: ProductItem;
}

import css from './variantSwitcher.module.scss';
import { Tag } from '@/components/shared';

export const VariantSwitcher = ({ product, productItem }: IProps) => {
  const router = useRouter();

  const productVariants = product.productItem.filter(
    (item) => item.colorId === productItem.colorId
  );

  const AvailableProductMemory = product.memory.map((item) => ({
    id: item.id,
    name: item.name,
    disabled: !productVariants.some((variant) => variant.memoryId === item.id),
  }));
  const AvailableProductRam = product.ram.map((item) => ({
    id: item.id,
    name: item.name,
    disabled: !productVariants.some((variant) => variant.ramId === item.id),
  }));

  const [variants, setVariants] = useState({
    productId: product.id,
    colorId: productItem.colorId,
    memoryId: productItem.memoryId,
    ramId: productItem.ramId,
  });

  const query = qs.stringify(variants, {
    arrayFormat: 'comma',
  });

  useEffect(() => {
    async function getVariant() {
      try {
        // console.log('query', query, variants);
        const id = await api.variants.getVariant(query);
        console.log('id', id);
        router.push(`/product/${product.id}/${id}`);
      } catch (error) {
        console.log(error);
      }
    }

    getVariant();
  }, [variants]);

  const colorHandler = (color: number) => {
    setVariants((prev) => ({
      colorId: color,
      productId: prev.productId,
      ramId: null,
      memoryId: null,
    }));
  };
  const ramHandler = (ram: number) => {
    setVariants((prev) => ({ ...prev, ramId: ram }));
  };
  const memoryHandler = (memory: number) => {
    setVariants((prev) => ({ ...prev, memoryId: memory }));
  };

  return (
    <div className={css.container}>
      <ul className={css.tagList}>
        {product.colors.map((color) => (
          <Tag
            key={color.id}
            name={color.name}
            tagId={color.id}
            active={variants.colorId === color.id}
            clickHandler={colorHandler}
          ></Tag>
        ))}
      </ul>
      {AvailableProductMemory.length > 0 && (
        <ul className={css.tagList}>
          {AvailableProductMemory.map((memory) => (
            <Tag
              key={memory.id}
              name={memory.name}
              tagId={memory.id}
              active={variants.memoryId === memory.id}
              clickHandler={memoryHandler}
              disabled={memory.disabled}
            ></Tag>
          ))}
        </ul>
      )}
      {AvailableProductRam.length > 0 && (
        <ul className={css.tagList}>
          {AvailableProductRam.map((ram) => (
            <Tag
              key={ram.id}
              name={ram.name}
              tagId={ram.id}
              active={variants.ramId === ram.id}
              clickHandler={ramHandler}
              disabled={ram.disabled}
            ></Tag>
          ))}
        </ul>
      )}
    </div>
  );
};
