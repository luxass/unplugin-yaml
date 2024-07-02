import YamlPlugin from "unplugin-yaml/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(
      YamlPlugin(),
    );

    return config;
  },
};

export default nextConfig;
