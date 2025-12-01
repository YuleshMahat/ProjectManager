import { v2 as cloudinary } from "cloudinary";
import config from "../config/config";

export const extractImage = async (req: Request) => {
  const formData = await req.formData();

  const entries = Object.fromEntries(formData.entries());
  const file = entries.imageFile as File;
  delete entries.imageFile;

  return { file, body: entries };
};

export const uploadImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
  });

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolioManager" },
        (error, uploaded) => {
          if (error) reject(error);
          else resolve(uploaded);
        }
      );
      stream.end(buffer);
    });
    console.log(result);
  } catch (error) {
    console.log(error);
    return null;
  }
};
