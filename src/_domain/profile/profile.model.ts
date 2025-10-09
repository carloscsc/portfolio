import mongoose, { Model, Schema } from "mongoose";
import { ProfileTypes } from "./profile.schema";

const ProjectMongooseSchema = new Schema<ProfileTypes>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    client_name: { type: String, required: true },
    client_description: { type: String },
    client_location: { type: String, required: true },
    client_logo: { type: String, required: true },
    client_link: { type: String },
    duration: { type: String, required: true },
    year: { type: Number, required: true },
    demo_link: { type: String },
    repo_link: { type: String },
    cover: { type: String, required: true },
    about_project: { type: String, required: true },
    technologies: { type: [String] },
    functionalities: { type: [String], required: true },
    gallery: { type: [String] },
    challenges: { type: [String] },
    results: { type: [String], required: true },
    status: { type: String, enum: ["ativo", "inativo"], default: "ativo" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: any) {
        ret._id = ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Project: Model<ProfileTypes> =
  mongoose.models.Project ||
  mongoose.model<ProfileTypes>("Project", ProjectMongooseSchema);
