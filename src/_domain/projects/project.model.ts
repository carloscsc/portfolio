import mongoose, { Model, Schema } from "mongoose";
import {
  ProjectTypes,
  TranslationContentProjectType,
  CollaboratorType,
} from "./project.schema";
import "../archive/archive.models";

const TranslationContentSchema = new Schema<TranslationContentProjectType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    about_project: { type: String, required: true },
    functionalities: { type: [String] },
    challenges: { type: [String] },
    results: { type: [String] },
    duration: { type: String },
  },
  { _id: false },
);

const CollaboratorSchema = new Schema<CollaboratorType>(
  {
    role: { type: String, required: true },
    name: { type: String, required: true },
    website: { type: String },
    linkedin: { type: String },
  },
  { _id: false },
);

const ProjectMongooseSchema = new Schema<ProjectTypes>(
  {
    agency_id: { type: String },
    collaborators: { type: [CollaboratorSchema] },

    slug: { type: String, required: true, unique: true },
    year: { type: String },
    demo_link: { type: String },
    repo_link: { type: String },
    cover: { type: String, required: true },
    technologies: [{ type: String }],
    category: { type: [String], required: true },
    gallery: { type: [String] },
    client_id: { type: String },
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
  },
);

export const Project: Model<ProjectTypes> =
  mongoose.models.Project ||
  mongoose.model<ProjectTypes>("Project", ProjectMongooseSchema);
