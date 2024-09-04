import { getServerSession } from 'next-auth';
import { authOptions } from '../consts/authOptions';
import { IUserSession } from '@/models/user';

//don't use reexport, its only server func, can be problem in client
export const getUserSession = async (): Promise<IUserSession | null> => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
