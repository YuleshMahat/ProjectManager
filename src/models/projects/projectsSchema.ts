// src/models/Project.ts
import mongoose, { Document, Model } from "mongoose";

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  image: string; // URL to uploaded image
  skills: string[]; // e.g. ["Next.js", "TypeScript"]
  github: string; // full URL
  live: string; // full URL
  featured?: boolean; // optional: pin to top
  order?: number; // optional: manual sorting
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: false, // one user → many projects
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    image: {
      type: String,
      required: true,
      default: "/fallback-project.jpg",
    },
    skills: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+/i, "Please enter a valid GitHub URL"],
    },
    live: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+/i, "Please enter a valid live URL"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient fetches
projectSchema.index({ userId: 1, order: -1 });
projectSchema.index({ userId: 1, featured: -1 });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
