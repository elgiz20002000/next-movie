/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:[
      "m.media-amazon.com"
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
}
}

module.exports = nextConfig
