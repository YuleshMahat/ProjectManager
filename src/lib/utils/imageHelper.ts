import { v2 as cloudinary } from "cloudinary";
import config from "../config/config";

interface ProjectBody {
  name: string;
  image?: string;
  skills: string;
  github: string;
  live: string;
  description: string;
  featured: string;
}

export const extractImage = async (
  req: Request
): Promise<{ file: File | null; body: ProjectBody }> => {
  const formData = await req.formData();

  const entries = Object.fromEntries(formData.entries());
  let file = entries.imageFile as File | null;

  console.log(file);
  delete entries.imageFile;

  const body: ProjectBody = {
    name: String(entries.name),
    image: String(entries.image || ""),
    skills: String(entries.skills || ""),
    github: String(entries.github || ""),
    live: String(entries.live || ""),
    description: String(entries.description || ""),
    featured: String(entries.featured || ""),
  };
  if (typeof file === "string") {
    file = null;
  }
  return { file, body };
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
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolioManager" },
          (error, uploaded) => {
            if (error) reject(error);
            else resolve(uploaded);
          }
        );
        stream.end(buffer);
      }
    );
    return result.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
