import { ICartItemUI } from '@/models/cartFavor';
import { useCartStore } from '@/stores';
import { useEffect } from 'react';

interface IUseCart {
  items: ICartItemUI[];
  loading: boolean;
  error: boolean;
  totalAmount: number;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCart = (): IUseCart => {
  const cart = useCartStore((state) => state);

  useEffect(() => {
    cart.fetchCartItems();
  }, []);

  return cart;
};
