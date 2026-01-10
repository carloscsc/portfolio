import { z } from "zod";
import { fileSchema } from "../shared/types";
import { CategSchema, TagSchema } from "../archive/archive.schema";

export const TranslationContentProjectSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  client_description: z.string().optional(),
  about_project: z.string().min(30, "A descrição do projeto é obrigatória"),
  functionalities: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  results: z.array(z.string()).optional(),
  duration: z.string().optional(),
});
export type TranslationContentProjectType = z.infer<
  typeof TranslationContentProjectSchema
>;

export const TranslationSchema = z.object({
  en: TranslationContentProjectSchema,
  br: TranslationContentProjectSchema,
});

export const ProjectSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  client_name: z.string().min(1, "O nome do cliente é obrigatório"),
  client_location: z.string(),
  client_logo: z.string(),
  client_link: z.string().optional(),
  year: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return Number(val) > 2000;
      },
      { error: "Data precisa ser superir a 2000" },
    ),
  demo_link: z.string().optional(),
  repo_link: z.string().optional(),
  cover: z.string(),
  technologies: z.array(z.string()).optional(),
  category: z.string().optional(),
  _category: z.array(CategSchema),
  gallery: z.array(z.string()).optional(),
  status: z.enum(["ativo", "inativo"]),
  translations: TranslationSchema,
  tags: z.array(TagSchema).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StoreProjectSchema = ProjectSchema.omit({
  _id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  cover: true,
  gallery: true,
  client_logo: true,
  _category: true,
}).extend({
  cover: fileSchema,
  client_logo: fileSchema,
  gallery: z.array(fileSchema).optional(),
});

export const UpdateProjectSchema = ProjectSchema.partial()
  .omit({
    cover: true,
    gallery: true,
    client_logo: true,
    _category: true,
  })
  .extend({
    cover: fileSchema.optional(),
    client_logo: fileSchema.optional(),
    gallery: z.array(fileSchema).optional(),
    _gallery: z.array(z.string()).optional(),
  });

/** Types */
export type ProjectTypes = z.infer<typeof ProjectSchema>;
export type StoreProjectTypes = z.infer<typeof StoreProjectSchema>;
export type UpdateProjectTypes = z.infer<typeof UpdateProjectSchema>;
