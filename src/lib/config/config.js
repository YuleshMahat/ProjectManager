const config = {
  mongoOptions: {
    salt: +process.env.SALT || 10,
    url: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresin: process.env.EXPIRES_IN || "1h",
    refresh_secret: process.env.JWT_REFRESH_SECRET || "REFRESH-SECRET_KEY",
    refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
  cloudinary: {
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  },
};

export default config;
