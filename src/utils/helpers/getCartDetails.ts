import { ICart, ICartItemUI, IItemUI } from '@/models/cartFavor';

interface ReturnProps {
  items: ICartItemUI[];
  totalAmount: number;
}

export const getCartDetails = (cart: ICart): ReturnProps => {
  const items = cart.cartProduct.map((item) => ({
    id: item.id,
    productItemId: item.productItemId,
    quantity: item.quantity,
    title: item.productItem.title,
    img: item.productItem.img,
    price: item.productItem.price * item.quantity,
    color: item.productItem.color?.name,
    memory: item.productItem.memory?.name,
    ram: item.productItem.ram?.name,
    cnt: item.productItem.cnt,
    disabled: false,
  }));

  return {
    totalAmount: cart.totalAmount,
    items,
  };
};
