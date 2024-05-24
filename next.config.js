/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/Home",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
