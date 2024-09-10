import {
  Category,
  Color,
  Memory,
  Product,
  ProductInfo,
  ProductItem,
  Ram,
} from '@prisma/client';

export interface IProductInfo {
  product: Product & {
    memory: Memory[];
    colors: Color[];
    ram: Ram[];
    category: Category;
    productInfo: ProductInfo[];
    productItem: ProductItem[];
  };
  productItem: ProductItem;
}
export interface IInfoProduct {
  info: {
    title: string;
    description: string;
  }[];
  productId: string;
}

export interface IProductItem {
  title: string;
  cnt: number;
  img: string;

  oldPrice: number | null;
  price: number;

  productId: number;
  colorId: string | null;
  memoryId: string | null;
  ramId: string | null;
}

export interface IDeleteProductItem {
  productId: string;
  colorId: string | null;
  memoryId: string | null;
  ramId: string | null;
}

export interface IProductThumbnails {
  thumbnails: string;
  productItemId: string;
}
