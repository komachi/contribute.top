import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  reactCompiler: true,
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    globalNotFound: true,
    useTypeScriptCli: true,
  },
};

export default nextConfig;
