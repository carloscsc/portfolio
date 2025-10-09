import { ProjectTypes } from "@/_domain/projects/project.schema";
import z from "zod";

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
    message: "Informe um número de celular válido",
  });

export interface ResponseType {
  isSuccess?: boolean;
  project?: ProjectTypes;
  message?: {
    type: "success" | "error" | "info";
    text: string;
  };
}
