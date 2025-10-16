import mongoose, { Model, Schema } from "mongoose";
import { userTypes } from "@/_domain/user/user.schema";

const userSchema = new Schema<userTypes>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    nascimento: { type: String, required: true },
    cel: { type: String, required: true },
    tel: { type: String },
    cep: { type: String, required: true },
    endereco: { type: String, required: true },
    numero: { type: String },
    complemento: { type: String },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    uf: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "subscriber"],
      required: true,
      default: "subscriber",
    },
    status: {
      type: String,
      enum: ["pendent", "verified"],
      required: true,
      default: "pendent",
    },
    marketing: { type: Boolean },
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

// userSchema.index({ email: 1 });
// userSchema.index({ cpf: 1 });
// userSchema.index({ name: "text" });

export const User: Model<userTypes> =
  mongoose.models.User || mongoose.model<userTypes>("User", userSchema);
