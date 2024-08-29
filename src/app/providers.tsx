'use client';
import { toastOptions } from '@/utils/consts/ToastConfig';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme="light">
        {children}
        <Toaster
          position="top-right"
          toastOptions={toastOptions}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
