require("dotenv").config();

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    FATSECRET_CONSUMER_KEY: process.env.FATSECRET_CONSUMER_KEY,
    FATSECRET_CONSUMER_SECRET: process.env.FATSECRET_CONSUMER_SECRET,
  },
};
