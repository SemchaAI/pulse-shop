import type { Color, Memory } from '@prisma/client';
import server from './api/server';
import { ApiRoutes } from './api/constants';

export const getColors = async (): Promise<Color[]> => {
  const { data } = await server.get<Color[]>(ApiRoutes.FILTER_COLORS);
  return data;
};
export const getMemory = async (): Promise<Color[]> => {
  const { data } = await server.get<Memory[]>(ApiRoutes.FILTER_MEMORY);
  return data;
};
