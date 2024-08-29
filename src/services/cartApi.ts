import server from './api/server';
import { ApiRoutes } from './api/constants';

import type { CreateItem, ICart } from '@/models/cartFavor';

export const getCart = async (): Promise<ICart> => {
  const { data } = await server.get<ICart>(ApiRoutes.CART);

  return data;
};

export const updateCartItemQuantity = async (
  cartProductId: number,
  quantity: number
): Promise<ICart> => {
  const { data } = await server.patch<ICart>(
    ApiRoutes.CART + `/${cartProductId}`,
    {
      quantity,
    }
  );

  return data;
};
export const removeCartItem = async (cartProductId: number): Promise<ICart> => {
  const { data } = await server.delete<ICart>(
    ApiRoutes.CART + `/${cartProductId}`
  );

  return data;
};

export const addCartItem = async (item: CreateItem): Promise<ICart> => {
  const { data } = await server.post<ICart>(ApiRoutes.CART, item);

  return data;
};
