/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src/components/', 'src/lib/', 'src/pages/']
  }
}

module.exports = nextConfig
