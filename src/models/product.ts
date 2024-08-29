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

// where: {
//   id: Number(productId),
// },
// include: {
//   productItem: {
//     where: {
//       id: Number(productItemId),
//     },
//     include: {
//       productImages: true,
//     },
//   },
//   colors: true,
//   memory: true,
//   category: true,
//   productInfo: true,
// },
