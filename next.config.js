/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

require("dotenv").config();

module.exports = {
  env: {
    API_ID: process.env.API_ID,
    API_KEY: process.env.API_KEY,
    nextConfig,
  },
};
