import { useFavoriteStore } from '@/stores';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useFavoriteHandlers = (id: number) => {
  const [productId, setProductId] = useState(-1);

  const [addFavoriteItem, loading, isInFavorite] = useFavoriteStore((state) => [
    state.addFavoriteItem,
    state.loading,
    state.isInFavorite,
  ]);
  const isFavorite = isInFavorite(id);

  const addToFavoriteHandler = async () => {
    try {
      if (loading)
        return toast.loading('Wait.Adding to favorite previous request...', {
          duration: 3000,
        });
      setProductId(id);
      await addFavoriteItem({ productItemId: id });
      toast.success('Product added to favorite');
    } catch (error) {
      console.log(error);
      toast.error('Product not added to favorite');
    } finally {
      setProductId(-1);
    }
  };

  return { addToFavoriteHandler, loading, productId, isFavorite };
};
