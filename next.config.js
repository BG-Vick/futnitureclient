/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost']
    //remotePatterns: [
    //  {
        //protocol: 'https' || 'http',
        //hostname: 'http://localhost:7000/5a5d6020-4ae3-4e24-a7f3-18eb213618d8.jpg',
    //  },
    //],
  },
}
 
module.exports = nextConfig