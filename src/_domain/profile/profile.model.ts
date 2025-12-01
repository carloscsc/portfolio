import mongoose, { Model, Schema } from "mongoose";
import {
  ProfileTypes,
  translationContentType,
  highlightType,
} from "./profile.schema";

const HighlightSchema = new Schema<highlightType>(
  {
    header: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const TranslationContentSchema = new Schema<translationContentType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    highlights: { type: [HighlightSchema], required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

const ProfileMongooseSchema = new Schema<ProfileTypes>(
  {
    name: { type: String, required: true },
    cover: { type: String, required: true },
    translations: {
      en: { type: TranslationContentSchema, require: true },
      br: { type: TranslationContentSchema, required: true },
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

export const Profile: Model<ProfileTypes> =
  mongoose.models.Profile ||
  mongoose.model<ProfileTypes>("Profile", ProfileMongooseSchema);
