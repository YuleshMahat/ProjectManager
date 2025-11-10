// models/PersonalInfo.ts
import mongoose, { Schema, Document, Types, Model } from "mongoose";

export interface IPersonalInfo extends Document {
  userId: Types.ObjectId;
  name: string;
  email: string;
  title: string;
  github: string;
  linkedin: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonalInfoSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ONE PersonalInfo PER USER
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "Full-Stack Developer",
    },
    github: {
      type: String,
      trim: true,
      validate: {
        validator: (v: string) => !v || /^https?:\/\/github\.com\/.+$/.test(v),
        message: "Please enter a valid GitHub URL",
      },
    },
    linkedin: {
      type: String,
      trim: true,
      validate: {
        validator: (v: string) =>
          !v || /^https?:\/\/(www\.)?linkedin\.com\/in\/.+$/.test(v),
        message: "Please enter a valid LinkedIn URL",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast lookup + enforce one per user
PersonalInfoSchema.index({ userId: 1 }, { unique: true });

const PersonalInfo: Model<IPersonalInfo> =
  mongoose.models.PersonalInfo ||
  mongoose.model<IPersonalInfo>("PersonalInfo", PersonalInfoSchema);

export default PersonalInfo;
