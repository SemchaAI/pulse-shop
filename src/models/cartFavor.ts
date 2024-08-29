import {
  Cart,
  CartProduct,
  Color,
  Favorite,
  Memory,
  Product,
  ProductItem,
  Ram,
} from '@prisma/client';

//CART FROM SERVER
interface IProductItem extends ProductItem {
  product: Product;
  color: Color;
  memory?: Memory;
  ram?: Ram;
}
export interface IProduct extends CartProduct {
  productItem: IProductItem;
}

export interface ICart extends Cart {
  cartProduct: IProduct[];
}
export interface IFavorite extends Favorite {
  favoriteProduct: IProduct[];
}
//------------

//CART-FAVOR FOR UI
export interface IItemUI {
  id: number;
  productItemId: number;

  cnt: number;
  title: string;
  img: string;
  price: number;

  color?: string;
  memory?: string;
  ram?: string;

  //new for ui
  disabled: boolean;
}

export interface ICartItemUI extends IItemUI {
  quantity: number;
}
export interface IFavoriteItemUI extends IItemUI {}
//create cart model

export interface CreateItem {
  productItemId: number;
  quantity?: number;
}
