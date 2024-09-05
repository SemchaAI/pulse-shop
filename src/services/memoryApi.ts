import server from './api/server';
import { ApiRoutes } from './api/constants';
import { Memory } from '@prisma/client';

export const createOne = async (name: { name: string }): Promise<Memory> => {
  const { data } = await server.post<Memory>(ApiRoutes.ADMIN_MEMORY, name);
  return data;
};
export const deleteOne = async (name: { name: string }): Promise<Memory> => {
  const { data } = await server.delete<Memory>(ApiRoutes.ADMIN_MEMORY, {
    data: name,
  });
  return data;
};
