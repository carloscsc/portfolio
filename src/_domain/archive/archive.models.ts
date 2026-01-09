import mongoose, { Model, Schema } from "mongoose";
import { TagType } from "./archive.schema";

const TagMongooseSchema = new Schema<TagType>(
  {
    label: { type: String, required: true, index: true },
    value: { type: String, required: true, index: { unique: true } },
    // description_en: { type: String, required: true },
    // description_br: { type: String, required: true },
    // cover: { type: String, required: true },
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
