'use client';
import { AnonymousSessionProvider } from '@/components/entities';
import { toastOptions } from '@/utils/consts/ToastConfig';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AnonymousSessionProvider>
        <ThemeProvider defaultTheme="light">
          {children}
          <Toaster
            position="top-right"
            toastOptions={toastOptions}
          />
        </ThemeProvider>
      </AnonymousSessionProvider>
    </SessionProvider>
  );
}
