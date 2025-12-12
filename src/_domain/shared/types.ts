import { ProfileTypes } from "@/_domain/profile/profile.schema";
import { ProjectTypes } from "@/_domain/projects/project.schema";
import { JWTPayload } from "jose";
import { Types } from "mongoose";
import z from "zod";
import { userTableType } from "../user/user.schema";

export const fileSchema = z
  .instanceof(File, { message: "Arquivo é obrigatório" })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Arquivo deve ter no máximo 5MB",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    { message: "Apenas imagens JPEG, PNG ou WebP são permitidas" }
  );

export const phoneSchema = z
  .string()
  .transform((val) => val?.replace(/\D/g, ""))
  .refine((val) => val?.length === 11, {
    params: { format: "phone" },
  });

export interface ResponseType {
  isSuccess?: boolean;
  project?: ProjectTypes;
  profile?: ProfileTypes;
  user?: userTableType;
  message?: {
    type: "success" | "error" | "alert";
    content: string;
  };
}

export interface SessionPayload extends JWTPayload {
  _id: Types.ObjectId | string;
  role?: string;
}
