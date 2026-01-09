import mongoose, { Model, Schema } from "mongoose";
import { CategType, TagType } from "./archive.schema";

/**
 * TAG
 */
const TagMongooseSchema = new Schema<TagType>(
  {
    label: { type: String, required: true, index: true },
    value: { type: String, required: true, index: { unique: true } },
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
  },
);

export const Tag: Model<TagType> =
  mongoose.models.Tag || mongoose.model<TagType>("Tag", TagMongooseSchema);

/**
 * CATEG
 */
const CategMongooseSchema = new Schema<CategType>(
  {
    label: { type: String, required: true, index: true },
    value: { type: String, required: true, index: { unique: true } },
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
  },
);

export const Category: Model<CategType> =
  mongoose.models.Category ||
  mongoose.model<TagType>("Category", CategMongooseSchema);
