'use server';
import { cookies } from 'next/headers';

export const deleteToken = () => {
  cookies().delete('token');
};
