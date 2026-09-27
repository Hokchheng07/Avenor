import type { NextConfig } from "next";
import { publicEnv } from "./src/lib/public-env";

const coversUrl = new URL(publicEnv.openLibraryCoversUrl);
const coversPath = coversUrl.pathname.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: coversUrl.protocol === "http:" ? "http" : "https",
        hostname: coversUrl.hostname,
        port: coversUrl.port,
        pathname: `${coversPath}/b/**`,
      },
      {
        protocol: coversUrl.protocol === "http:" ? "http" : "https",
        hostname: coversUrl.hostname,
        port: coversUrl.port,
        pathname: `${coversPath}/a/**`,
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
