import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pulse Shop App',
    short_name: 'Pulse Shop',
    description: 'Pulse Shop - Online shopping application',
    start_url: '/',
    display: 'standalone',
    // icons: [
    //   {
    //     src: '/favicon.ico',
    //     sizes: 'any',
    //     type: 'image/x-icon',
    //   },
    // ],
  };
}
