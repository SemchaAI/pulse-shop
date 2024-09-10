import type { Product, ProductItem } from '@prisma/client';
import server from './api/server';
import { ApiRoutes } from './api/constants';
import {
  IDeleteProductItem,
  IInfoProduct,
  IProductItem,
  IProductThumbnails,
} from '@/models/product';
export interface ISearchProduct extends ProductItem {
  product: Product;
}
interface IProduct {
  description: string;
  categoryId: string;
}

export const search = async (query: string): Promise<ISearchProduct[]> => {
  const { data } = await server.get<ISearchProduct[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query },
    }
  );
  return data;
};

export const createOne = async (product: IProduct): Promise<Product> => {
  const { data } = await server.post<Product>(ApiRoutes.ADMIN_PRODUCT, product);
  return data;
};
export const deleteOne = async (productId: string): Promise<void> => {
  const { data } = await server.delete(ApiRoutes.ADMIN_PRODUCT, {
    data: { productId },
  });
  return data;
};

export const createInfo = async ({
  info,
  productId,
}: IInfoProduct): Promise<void> => {
  const { data } = await server.post(ApiRoutes.ADMIN_PRODUCT_INFO, {
    info,
    productId,
  });
  return data;
};
export const deleteInfo = async ({
  productId,
}: {
  productId: string;
}): Promise<void> => {
  const { data } = await server.delete(ApiRoutes.ADMIN_PRODUCT_INFO, {
    data: { productId },
  });
  return data;
};

export const createOneProductItem = async (
  product: IProductItem
): Promise<Product> => {
  const { data } = await server.post(ApiRoutes.ADMIN_PRODUCT_ITEM, product);
  return data;
};
export const deleteOneProductItem = async (
  product: IDeleteProductItem
): Promise<Product> => {
  const { data } = await server.delete(ApiRoutes.ADMIN_PRODUCT_ITEM, {
    data: product,
  });
  return data;
};

export const createProductItemImages = async (
  thumbnails: IProductThumbnails
): Promise<Product> => {
  const { data } = await server.post(
    ApiRoutes.ADMIN_PRODUCT_IMAGES,
    thumbnails
  );
  return data;
};
export const deleteProductItemImages = async (id: {
  productItemId: string;
}): Promise<Product> => {
  const { data } = await server.delete(ApiRoutes.ADMIN_PRODUCT_IMAGES, {
    data: id,
  });
  return data;
};
