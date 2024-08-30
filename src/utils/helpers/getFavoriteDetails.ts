import { IFavorite, IFavoriteItemUI } from '@/models/cartFavor';

interface ReturnProps {
  items: IFavoriteItemUI[];
}

export const getFavoriteDetails = (cart: IFavorite): ReturnProps => {
  const items = cart.favoriteProduct.map((item) => ({
    id: item.id,
    productItemId: item.productItemId,
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
    items,
  };
};
