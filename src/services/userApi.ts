import server from './api/server';
import { ApiRoutes } from './api/constants';
import { User } from '@prisma/client';
interface IProps
  extends Omit<
    User,
    'password' | 'createdAt' | 'updatedAt' | 'verified' | 'role'
  > {}

export const getUser = async (): Promise<IProps> => {
  const { data } = await server.get<IProps>(ApiRoutes.USER);

  return data;
};

export const updateCode = async ({ id }: { id: string }) => {
  const { data } = await server.patch(ApiRoutes.REACTIVATION, { id });

  return data;
};
