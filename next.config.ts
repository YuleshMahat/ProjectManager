// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // THIS IS THE MAGIC LINE ↓↓↓
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ← double asterisk = allow EVERY domain
      },
      {
        protocol: "http",
        hostname: "**", // also allow http (for local dev / some old sites)
      },
    ],
  },

  // Optional: if you use TypeScript path aliases, keep them
  webpack(config) {
    config.resolve.alias["@"] = __dirname + "/src";
    return config;
  },
};

module.exports = nextConfig;
