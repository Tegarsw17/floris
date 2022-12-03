/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_DATABASE_CONNECTION:
      process.env.NEXT_PUBLIC_DATABASE_CONNECTION,
  },
};

module.exports = nextConfig;
