import type { Product, ProductItem } from '@prisma/client';
import server from './api/server';
import { ApiRoutes } from './api/constants';
export interface ISearchProduct extends ProductItem {
  product: Product;
}

export const search = async (query: string): Promise<ISearchProduct[]> => {
  const { data } = await server.get<ISearchProduct[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query },
    }
  );
  return data;
};
