import mongoose, { Model, Schema } from "mongoose";
import { TechTagTypes } from "./stack.schema";

const TechTagMongooseSchema = new Schema<TechTagTypes>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
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

export const TechTag: Model<TechTagTypes> =
  mongoose.models.TechTags ||
  mongoose.model<TechTagTypes>("TechTag", TechTagMongooseSchema);
