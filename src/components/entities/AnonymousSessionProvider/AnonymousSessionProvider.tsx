'use client';
import { useFavoriteStore } from '@/stores';
import { useSession } from 'next-auth/react';

import { useEffect } from 'react';

export const AnonymousSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status, update } = useSession();
  const favorite = useFavoriteStore((state) => state);

  useEffect(() => {
    console.log('AnonymousSession', status);
    // const sign = async () => {
    //   await signIn('credentials', { redirect: false }, 'anon=true');

    //   favorite.fetchFavoriteItems();
    // };

    // if (status === 'unauthenticated') {
    //   sign();
    // }

    // if (status === 'unauthenticated') {
    //   signIn('credentials', { redirect: false }, 'anon=true')
    //     .then(async () => {
    //       await update();
    //       console.info('Logged in as anonymous');
    //     })
    //     .catch((error) => {
    //       console.error('Failed to login as anonymous', error);
    //     });
    // }

    if (status === 'authenticated') {
      console.info('fetchFavoriteItems');
      favorite.fetchFavoriteItems();
    }
  }, [status]);

  return <>{children}</>;
};
