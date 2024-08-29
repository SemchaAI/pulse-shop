'use client';
import { Heart, Loader, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

import { useCartStore, useFavoriteStore } from '@/stores';
import { MainBtn, SaleTag } from '@/components/shared';

import type { Product, ProductItem } from '@prisma/client';
import css from './productCard.module.scss';
import { useState } from 'react';
import { StarRate } from '@/components/entities';

interface IProps {
  item: ProductItem;
  product: Product;
}

export const ProductCard = ({ item, product }: IProps) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);
  const [addFavoriteItem, loadingFavor] = useFavoriteStore((state) => [
    state.addFavoriteItem,
    state.loading,
  ]);

  let [currId, setCurrId] = useState(-1);
  const addToCartHandler = async (item: ProductItem) => {
    try {
      setCurrId(item.id);
      await addCartItem({ productItemId: item.id });
      toast.success('Product added to cart');
    } catch (error) {
      console.log(error);
      toast.error('Product not added to cart');
    }
  };
  const addToFavorHandler = async (item: ProductItem) => {
    try {
      setCurrId(item.id);
      await addFavoriteItem({ productItemId: item.id });
      toast.success('Product added to favorite');
    } catch (error) {
      console.log(error);
      toast.error('Product not added to favorite');
    }
  };

  return (
    <li className={css.card}>
      <Link
        href={`/product/${product.id}/${item.id}`}
        className={css.cardLink}
      >
        <Image
          className={css.cardImg}
          width={200}
          height={200}
          src={`${process.env.NEXT_PUBLIC_IMAGES_HOST}${item.img}`}
          alt={item.title}
          // placeholder="blur"
          // blurDataURL={`${process.env.NEXT_PUBLIC_IMAGES_HOST}${item.img}`}
        />
        <h3 className={css.cardTitle}>{item.title}</h3>
      </Link>

      <div className={css.cardRating}>
        Rating:
        <StarRate
          className={css.starRate}
          rate={product.totalRating}
        />
      </div>
      <div className={css.cardPrice}>
        {item.oldPrice && (
          <div className={css.oldPriceBlock}>
            <SaleTag
              price={item.price}
              oldPrice={item.oldPrice}
            />
            <span className={css.oldPrice}>{item.oldPrice} MDL</span>
          </div>
        )}
        <p>Price: {item.price} MDL</p>
      </div>
      <div className={css.cardControls}>
        <MainBtn
          className={css.cardBtn}
          version="contain"
          onClick={() => addToCartHandler(item)}
          disabled={loading && currId === item.id}
        >
          {loading && currId === item.id ? (
            <Loader
              className="rotate360"
              width={20}
              height={20}
            />
          ) : (
            <>
              <ShoppingCart size={20} /> Add to cart
            </>
          )}
        </MainBtn>
        <MainBtn
          version="contain"
          onClick={() => addToFavorHandler(item)}
          disabled={loadingFavor && currId === item.id}
        >
          {loadingFavor && currId === item.id ? (
            <Loader
              className="rotate360"
              width={20}
              height={20}
            />
          ) : (
            <Heart size={20} />
          )}
        </MainBtn>
      </div>
    </li>
  );
};
