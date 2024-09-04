import type { Category } from '@prisma/client';
import server from './api/server';
import { ApiRoutes } from './api/constants';

// export const getAll = async (): Promise<Category[]> => {
//   const { data } = await server.get<Category[]>(ApiRoutes.CATEGORY);
//   return data;
// };
export const createOne = async (name: { name: string }): Promise<Category> => {
  const { data } = await server.post<Category>(ApiRoutes.ADMIN_CATEGORY, name);
  return data;
};
export const deleteOne = async (name: { name: string }): Promise<Category> => {
  const { data } = await server.delete<Category>(ApiRoutes.ADMIN_CATEGORY, {
    data: name,
  });
  return data;
};
