import server from './api/server';
import { ApiRoutes } from './api/constants';
import type { CreateItem, IFavorite } from '@/models/cartFavor';

export const getFavorite = async (): Promise<IFavorite> => {
  const { data } = await server.get<IFavorite>(ApiRoutes.FAVORITE);

  return data;
};

export const removeFavoriteItem = async (
  favoriteProductId: number
): Promise<IFavorite> => {
  const { data } = await server.delete<IFavorite>(
    ApiRoutes.FAVORITE + `/${favoriteProductId}`
  );

  return data;
};

export const addFavoriteItem = async (item: CreateItem): Promise<IFavorite> => {
  const { data } = await server.post<IFavorite>(ApiRoutes.FAVORITE, item);

  return data;
};
