import mongoose, { Model, Schema } from "mongoose";
import { userTypes } from "@/_domain/user/user.schema";

const userSchema = new Schema<userTypes>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

export const User: Model<userTypes> =
  mongoose.models.User || mongoose.model<userTypes>("User", userSchema);
