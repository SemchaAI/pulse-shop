import { Category, Product, ProductItem } from '@prisma/client';

export interface IProduct extends Product {
  productItem: ProductItem[];
}
export interface ICategory extends Category {
  products: IProduct[];
}

export interface IParams {
  query?: string;
  category?: string;
  limit?: string;

  sortBy?: string;

  price?: string;

  ram?: string;
  memory?: string;
  colors?: string;

  priceFrom?: string;
  priceTo?: string;
}
