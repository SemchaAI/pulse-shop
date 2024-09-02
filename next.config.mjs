/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/app/assets'],
    prependData: `@import "mixins.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_BASE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_BASE_ADDRESS,
        // port: process.env.NEXT_PUBLIC_BASE_PORT || '',
        pathname: '**',
      },
      {
        protocol: process.env.NEXT_PUBLIC_BASE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_BASE_ADDRESS2,
        pathname: '**',
      },
      {
        protocol: process.env.NEXT_PUBLIC_BASE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_BASE_ADDRESS3,
        pathname: '**',
      },
    ],
  },
  //dev
  productionBrowserSourceMaps: false,
  reactStrictMode: process.env.NEXT_PUBLIC_STRICT_MODE === 'true',
};

export default nextConfig;
