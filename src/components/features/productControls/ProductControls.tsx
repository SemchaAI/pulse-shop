'use client';
import { useSession } from 'next-auth/react';
import css from './productControls.module.scss';
import { useCartHandlers, useFavoriteHandlers } from '@/utils/hooks';
import { ProductItem } from '@prisma/client';
import { MainBtn } from '@/components/shared';
import { Heart, Loader, ShoppingCart } from 'lucide-react';

export const ProductControls = ({ item }: { item: ProductItem }) => {
  const session = useSession();
  const { addToCartHandler, loading, productId } = useCartHandlers(item.id);
  const {
    addToFavoriteHandler,
    loading: loadingFavor,
    productId: productIdFavor,
    isFavorite,
  } = useFavoriteHandlers(item.id, session.data?.user);

  return (
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
  );
};
