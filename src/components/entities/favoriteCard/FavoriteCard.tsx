'use client';
import { MainBtn } from '@/components/shared';
import css from './favoriteCard.module.scss';
import { ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { IFavoriteItemUI } from '@/models/cartFavor';
import { useCartHandlers } from '@/utils/hooks/useCartHandlers';

interface IProps {
  item: IFavoriteItemUI;
  removeFavoriteItem: (id: number) => Promise<void>;
}

export const FavoriteCard = ({ item, removeFavoriteItem }: IProps) => {
  const { addToCartHandler } = useCartHandlers(item.productItemId);

  return (
    <li
      className={css.favoriteItem + ' ' + (item.disabled ? css.disabled : '')}
      key={item.id}
    >
      <div className={css.favoriteItemContainer}>
        <Link
          className={css.productLink}
          href={`product/${item.id}`}
        >
          <Image
            // priority={i > 1 ? false : true}
            // loading={i > 1 ? 'lazy' : 'eager'}
            width={200}
            height={200}
            sizes="(max-width: 375px) 200px,200px"
            className={css.favoriteItemImg}
            src={process.env.NEXT_PUBLIC_IMAGES_HOST + '/' + item.img}
            alt={item.title}
          />
        </Link>
        <div className={css.favoriteItemInfo}>
          <div className={css.favoriteItemTitle}>{item.title}</div>
          <div className={css.favoriteItemDescription}>{item.description}</div>
          <div className={css.favoriteControls}>
            <div className={css.favoriteItemPrice}>
              <span>Price:</span>
              {item.price}
              <b>MDL</b>
            </div>
            <div className={css.favoriteItemPrice}>
              <MainBtn
                version="outline"
                onClick={() => removeFavoriteItem(item.id)}
                icon={true}
              >
                <X size={24} />
              </MainBtn>
              <MainBtn
                version="contain"
                icon={true}
                onClick={() => addToCartHandler()}
              >
                <ShoppingCart size={24} />
              </MainBtn>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
