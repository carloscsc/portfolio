import mongoose, { Model, Schema } from "mongoose";
import { ClientType } from "./clients.schema";

const ClientMongooseSchema = new Schema<ClientType>(
  {
    slug: { type: String, required: true, unique: true },
    client_name: { type: String, required: true },
    client_location: { type: String },
    client_logo: { type: String, required: true },
    client_link: { type: String },
    client_description: { type: String },
    client_description_br: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Client: Model<ClientType> =
  mongoose.models.Client ||
  mongoose.model<ClientType>("Client", ClientMongooseSchema);
