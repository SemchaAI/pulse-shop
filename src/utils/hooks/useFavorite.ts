import type { IFavoriteItemUI } from '@/models/cartFavor';
import { useFavoriteStore } from '@/stores/favorite';
import { useEffect } from 'react';

interface IUseFavorite {
  items: IFavoriteItemUI[];
  loading: boolean;
  error: boolean;
  removeFavoriteItem: (id: number) => Promise<void>;
}

export const useFavorite = (): IUseFavorite => {
  const favorite = useFavoriteStore((state) => state);

  useEffect(() => {
    favorite.fetchFavoriteItems();
  }, []);

  return favorite;
};
