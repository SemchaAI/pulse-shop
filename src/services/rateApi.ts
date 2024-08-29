import server from './api/server';
import { ApiRoutes } from './api/constants';
import { Rating } from '@prisma/client';
import { RatingForm } from '@/models/forms';

interface IRating {
  rates: Rating[];
  totalPages: number;
}

export const getAll = async (query: string): Promise<IRating> => {
  const { data } = await server.get<IRating>(ApiRoutes.RATE, {
    params: { query },
  });
  console.log('data', data);
  return data;
};

export const createRating = async (data: RatingForm): Promise<Rating> => {
  const { data: res } = await server.post<Rating>(ApiRoutes.RATE, data);
  return res;
};
export const updateRating = async (data: RatingForm): Promise<Rating> => {
  const { data: res } = await server.patch<Rating>(ApiRoutes.RATE, data);
  return res;
};
