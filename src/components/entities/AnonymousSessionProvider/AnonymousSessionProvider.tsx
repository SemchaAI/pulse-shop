'use client';
import { signIn, useSession } from 'next-auth/react';

import { useEffect } from 'react';

export const AnonymousSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  console.log('AnonymousSessionProvider', session, status);
  useEffect(() => {
    if (status === 'unauthenticated') {
      // login as anonymous
      signIn('credentials', { redirect: false }, 'anon=true');
    }
  }, [status]);
  return <>{children}</>;
};
