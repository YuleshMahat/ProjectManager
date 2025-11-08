import mongoose from "mongoose";
import config from "@/lib/config/config";

export const mongooseConnect = async () => {
  console.log("connection state of mongoose", mongoose.connection.readyState);
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(config.mongoOptions.url);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};
