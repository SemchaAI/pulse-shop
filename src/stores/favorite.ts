import { CreateItem, IFavoriteItemUI } from '@/models/cartFavor';
import { IUserSession } from '@/models/user';
import { api } from '@/services/api/baseApi';
import { getFavoriteDetails } from '@/utils/helpers';
import { signIn } from 'next-auth/react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface FavorState {
  loading: boolean;
  error: boolean;

  items: IFavoriteItemUI[];

  isInFavorite: (id: number) => boolean;

  fetchFavoriteItems: () => Promise<void>;
  //add type
  addFavoriteItem: (
    item: CreateItem,
    session: IUserSession | undefined
  ) => Promise<void>;
  removeFavoriteItem: (id: number) => Promise<void>;
}

export const useFavoriteStore = create<FavorState>()(
  devtools(
    (set, get) => ({
      items: [],
      loading: false,
      error: false,

      isInFavorite: (id: number) =>
        get().items.some((item) => item.productItemId === id),
      fetchFavoriteItems: async () => {
        set({ loading: true, error: false }, false, 'fetchFavoriteItems');
        try {
          const data = await api.favorite.getFavorite();
          //console.log(data);
          set(getFavoriteDetails(data));
          // set({ items: data.cartProduct, totalAmount: data.totalAmount });
        } catch (error) {
          set({ error: true }, false, 'fetchFavoriteItems-error');
        } finally {
          set({ loading: false }, false, 'fetchFavoriteItems');
        }
      },
      removeFavoriteItem: async (id: number) => {
        set((state) => ({
          loading: true,
          error: false,
          items: state.items.map((item) =>
            item.id === id ? { ...item, disabled: true } : item
          ),
        }));
        try {
          const data = await api.favorite.removeFavoriteItem(id);
          set(getFavoriteDetails(data));
        } catch (error) {
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },
      addFavoriteItem: async (
        item: CreateItem,
        session: IUserSession | undefined
      ) => {
        set({ loading: true, error: false });
        try {
          if (!session) {
            await signIn('credentials', { redirect: false }, 'anon=true');
          }
          const data = await api.favorite.addFavoriteItem(item);
          set(getFavoriteDetails(data));
        } catch (error) {
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'favorite-store',
    }
  )
);
