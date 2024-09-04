'use client';
import { Heart, Loader, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MainBtn, SaleTag } from '@/components/shared';

import type { Product, ProductItem } from '@prisma/client';
import css from './productCard.module.scss';

import { StarRate } from '@/components/entities';
import { useCartHandlers, useFavoriteHandlers } from '@/utils/hooks';
import { useSession } from 'next-auth/react';

interface IProps {
  item: ProductItem;
  product: Product;
}

export const ProductCard = ({ item, product }: IProps) => {
  const session = useSession();
  const { addToCartHandler, loading, productId } = useCartHandlers(item.id);
  const {
    addToFavoriteHandler,
    loading: loadingFavor,
    productId: productIdFavor,
    isFavorite,
  } = useFavoriteHandlers(item.id, session.data?.user);

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
          onClick={() => addToCartHandler()}
          disabled={loading && productId === item.id}
        >
          {loading && productId === item.id ? (
            <Loader
              className="rotate360"
              width={20}
              height={20}
            />
          ) : (
            <div className={css.cardBtnText}>
              <ShoppingCart size={20} />
              <span>Add to cart</span>
            </div>
          )}
        </MainBtn>
        <MainBtn
          version="contain"
          onClick={() => addToFavoriteHandler()}
          disabled={loadingFavor && productIdFavor === item.id}
        >
          {loadingFavor && productIdFavor === item.id ? (
            <Loader
              className="rotate360"
              width={20}
              height={20}
            />
          ) : (
            <Heart
              size={20}
              className={isFavorite ? css.favorite : ''}
            />
          )}
        </MainBtn>
      </div>
    </li>
  );
};
