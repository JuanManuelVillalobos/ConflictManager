import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'out',
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      // Ensure that WASM modules can be bundled correctly on the client side
      config.experiments = {
        asyncWebAssembly: true,
        layers: true,  // Enable the layers experiment
      };
    }

    return config;
  },
};



export default nextConfig;
