/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;
