/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['src/components/', 'src/lib/', 'src/pages/'],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      // server-side build時にテストファイルを除外する
      config.module.rules.push({
        test: /\.test\.tsx?$/,
        use: 'ignore-loader',
      })
    }

    return config
  },
}

module.exports = nextConfig
