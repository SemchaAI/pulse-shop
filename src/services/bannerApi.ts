import server from './api/server';
import { ApiRoutes } from './api/constants';
import { BannerSlide } from '@prisma/client';

type TBannerSlide = Omit<BannerSlide, 'id'>;

export const createOne = async (slide: TBannerSlide): Promise<TBannerSlide> => {
  //console.log('slide', slide);
  const { data } = await server.post<TBannerSlide>(
    ApiRoutes.ADMIN_BANNER,
    slide
  );
  return data;
};
export const deleteOne = async (name: { id: number }): Promise<BannerSlide> => {
  const { data } = await server.delete<BannerSlide>(ApiRoutes.ADMIN_BANNER, {
    data: name,
  });
  return data;
};
