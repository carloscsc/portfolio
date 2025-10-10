import mongoose, { Model, Schema } from "mongoose";
import { ProfileTypes } from "./profile.schema";

const ProfileMongooseSchema = new Schema<ProfileTypes>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
    highlights: [
      {
        header: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    phone: { type: String, required: true, unique: true },
    profile_count: { type: Number, required: true, unique: true },
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
