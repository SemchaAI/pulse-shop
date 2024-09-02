import { useCartStore } from '@/stores';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useCartHandlers = (id: number) => {
  const [productId, setProductId] = useState(-1);

  const [addCartItem, loading, items] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
    state.items,
  ]);

  const addToCartHandler = async () => {
    try {
      if (loading && items.length > 0)
        return toast.loading('Wait.Adding to cart previous request...', {
          duration: 3000,
        });
      setProductId(id);
      await addCartItem({ productItemId: id });
      toast.success('Product added to cart');
    } catch (error) {
      console.log(error);
      toast.error('Product not added to cart');
    } finally {
      setProductId(-1);
    }
  };

  return { addToCartHandler, loading, productId };
};
