import mongoose, { Model, Schema } from "mongoose";
import { ProjectTypes, TranslationContentProjectType } from "./project.schema";

const TranslationContentSchema = new Schema<TranslationContentProjectType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    client_description: { type: String },
    about_project: { type: String, required: true },
    functionalities: { type: [String] },
    challenges: { type: [String] },
    results: { type: [String] },
    duration: { type: String },
  },
  { _id: false }
);

const ProjectMongooseSchema = new Schema<ProjectTypes>(
  {
    slug: { type: String, required: true, unique: true },
    client_name: { type: String, required: true },
    client_location: { type: String },
    client_logo: { type: String, required: true },
    client_link: { type: String },
    year: { type: String },
    demo_link: { type: String },
    repo_link: { type: String },
    cover: { type: String, required: true },
    technologies: { type: [String] },
    gallery: { type: [String] },
    translations: {
      en: { type: TranslationContentSchema, require: true },
      br: { type: TranslationContentSchema, require: true },
    },
    status: {
      type: String,
      enum: ["ativo", "inativo"],
      default: "ativo",
    },
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

export const Project: Model<ProjectTypes> =
  mongoose.models.Project ||
  mongoose.model<ProjectTypes>("Project", ProjectMongooseSchema);
