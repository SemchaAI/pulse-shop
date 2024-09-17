import { CreateItem, ICartItemUI } from '@/models/cartFavor';
import { IUserSession } from '@/models/user';
import { api } from '@/services/api/baseApi';
import { getCartDetails } from '@/utils/helpers';
import { signIn } from 'next-auth/react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: ICartItemUI[];

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  //add type
  addCartItem: (
    item: CreateItem,
    session: IUserSession | undefined
  ) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  devtools(
    (set, get) => ({
      items: [],
      totalAmount: 0,

      loading: true,
      error: false,

      fetchCartItems: async () => {
        set({ loading: true, error: false }, false, 'fetchCartItems');
        try {
          const data = await api.cart.getCart();
          //console.log(data);
          set(getCartDetails(data));
          // set({ items: data.cartProduct, totalAmount: data.totalAmount });
        } catch (error) {
          set({ error: true }, false, 'fetchCartItems-error');
        } finally {
          set({ loading: false }, false, 'fetchCartItems');
        }
      },

      updateItemQuantity: async (id: number, quantity: number) => {
        try {
          set((state) => ({
            loading: true,
            error: false,
            items: state.items.map((item) =>
              item.id === id ? { ...item, disabled: true } : item
            ),
          }));
          const data = await api.cart.updateCartItemQuantity(id, quantity);
          set(getCartDetails(data));
        } catch (error) {
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },

      removeCartItem: async (id: number) => {
        try {
          set((state) => ({
            loading: true,
            error: false,
            items: state.items.map((item) =>
              item.id === id ? { ...item, disabled: true } : item
            ),
          }));
          const data = await api.cart.removeCartItem(id);
          set(getCartDetails(data));
        } catch (error) {
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },
      addCartItem: async (
        item: CreateItem,
        session: IUserSession | undefined
      ) => {
        set({ loading: true, error: false });
        try {
          if (!session) {
            await signIn('credentials', { redirect: false }, 'anon=true');
          }
          const data = await api.cart.addCartItem(item, session);
          set(getCartDetails(data));
        } catch (error) {
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'cart-store',
    }
  )
);
