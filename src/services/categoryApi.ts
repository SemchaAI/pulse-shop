import type { Category } from '@prisma/client';
import server from './api/server';
import { ApiRoutes } from './api/constants';

export const getAll = async (query: string): Promise<Category[]> => {
  const { data } = await server.get<Category[]>(ApiRoutes.CATEGORY, {
    params: { query },
  });
  return data;
};
