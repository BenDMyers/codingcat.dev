/* eslint @typescript-eslint/no-var-requires: "off" */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa');

module.exports = withPWA(
  withBundleAnalyzer({
    reactStrictMode: true,
    images: {
      domains: ['s3.us-west-2.amazonaws.com'],
      loader: 'cloudinary',
      path: 'https://media.codingcat.dev/image/upload/',
    },
    async redirects() {
      return [
        {
          source: '/blog/design-systems-with-web-components',
          destination: '/tutorial/design-systems-with-web-components',
          permanent: true,
        },
        {
          source: '/lessons/:path*',
          destination: '/tutorial/:path*',
          permanent: true,
        },
        {
          source: '/blog/:path((?!/).*)',
          destination: '/post/:path*',
          permanent: true,
        },
        {
          source: '/posts',
          destination: '/blog',
          permanent: true,
        },
      ];
    },
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
    },
  })
);
