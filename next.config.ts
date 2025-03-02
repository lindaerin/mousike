const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/mousike" : "",
  assetPrefix: isProd ? "/mousike/" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
