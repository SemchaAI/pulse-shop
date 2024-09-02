import { IFavorite, IFavoriteItemUI } from '@/models/cartFavor';

interface ReturnProps {
  items: IFavoriteItemUI[];
}

export const getFavoriteDetails = (cart: IFavorite): ReturnProps => {
  const items = cart.favoriteProduct.map((item) => ({
    id: item.id,
    productItemId: item.productItemId,
    description: item.productItem.product.description,
    title: item.productItem.title,
    img: item.productItem.img,
    price: item.productItem.price,
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
