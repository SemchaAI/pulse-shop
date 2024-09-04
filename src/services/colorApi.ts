import server from './api/server';
import { ApiRoutes } from './api/constants';
import { Color } from '@prisma/client';

export const createOne = async (name: { name: string }): Promise<Color> => {
  const { data } = await server.post<Color>(ApiRoutes.ADMIN_COLOR, name);
  return data;
};
export const deleteOne = async (name: { name: string }): Promise<Color> => {
  const { data } = await server.delete<Color>(ApiRoutes.ADMIN_COLOR, {
    data: name,
  });
  return data;
};
