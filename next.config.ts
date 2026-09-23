import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/b/**",
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "ia80*.us.archive.org",
      },
      {
        protocol: "https",
        hostname: "ia90*.us.archive.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
