import server from './api/server';
import { ApiRoutes } from './api/constants';
import { Ram } from '@prisma/client';

export const createOne = async (name: { name: string }): Promise<Ram> => {
  const { data } = await server.post<Ram>(ApiRoutes.ADMIN_RAM, name);
  return data;
};
export const deleteOne = async (name: { name: string }): Promise<Ram> => {
  const { data } = await server.delete<Ram>(ApiRoutes.ADMIN_RAM, {
    data: name,
  });
  return data;
};
