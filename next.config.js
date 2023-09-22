/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_DB_HOST]
    //remotePatterns: [
    //  {
    //    protocol: 'https' || 'http',
    //    hostname: process.env.NEXT_PUBLIC,
    //  },
    //],
  },
}
 
module.exports = nextConfig