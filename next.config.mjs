/** @type {import('next').NextConfig} */
const nextConfig = {
  // devIndicators:false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5005",
        pathname: "/images/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
