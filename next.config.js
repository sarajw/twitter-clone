/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com', 'localhost', 'pbs.twimg.com'],
  },
}

module.exports = nextConfig
