import { prisma } from '@/prisma/prisma-client';
import { filtersConfig } from '../consts/FiltersConfig';
import { ICategory, IParams } from '@/models/searchWithParams';

const { min, max } = filtersConfig();

export const findCategoriesWithParams = async (params: IParams) => {
  const colors = params.colors?.split(',').map(Number);
  const memory = params.memory?.split(',').map(Number);
  const ram = params.ram?.split(',').map(Number);

  const priceFrom = params.priceFrom ? Number(params.priceFrom) : min;
  const priceTo = params.priceTo ? Number(params.priceTo) : max;

  const categories: ICategory[] = await prisma.category.findMany({
    include: {
      products: {
        include: {
          productItem: {
            orderBy: {
              id: 'desc',
            },
            where: {
              colorId: { in: colors },
              memoryId: { in: memory },
              ramId: { in: ram },
              price: { gte: priceFrom, lte: priceTo },
            },
          },
        },
      },
    },
  });

  return categories;
};
