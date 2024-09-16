import { Suspense } from 'react';
import { Inter, Nunito } from 'next/font/google';

import type { Metadata } from 'next';

import { Providers } from './providers';
import { MainFooter, MainHeader } from '@/components/widgets';
import Loading from './loading';

import '@/app/assets/main.scss';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pulse Shop | Home',
  description: 'Best ecommerce shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.className} ${nunito.variable}`}>
        <SpeedInsights />
        <Providers>
          <MainHeader />
          <main
            style={{
              gridArea: `main`,
            }}
          >
            <Suspense fallback={<Loading />}>{children}</Suspense>
            {/* <ErrorSection /> */}
          </main>
          <MainFooter />
        </Providers>
      </body>
    </html>
  );
}
