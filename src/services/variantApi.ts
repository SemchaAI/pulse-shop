import type { Product, ProductItem } from '@prisma/client';
import server from './api/server';
import { ApiRoutes } from './api/constants';
interface IProps extends Product {
  productItem: ProductItem[];
}

export const getVariant = async (query: string): Promise<number> => {
  const { data } = await server.get<IProps>(ApiRoutes.SEARCH_VARIANT, {
    params: { query },
  });
  const id = data.productItem[0].id;
  // console.log('getVariant id', id);
  return id;
};
