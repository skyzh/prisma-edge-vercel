/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }
    // Important: return the modified config
    return config
  },
}

module.exports = nextConfig
