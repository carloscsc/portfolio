import { z } from "zod";
import { fileSchema } from "../shared/types";

export const ProjectSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string().min(1, "O título é obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  client_name: z.string().min(1, "O nome do cliente é obrigatório"),
  client_description: z.string().optional(),
  client_location: z.string().min(1, "A localização do cliente é obrigatória"),
  client_logo: z.string(),
  client_link: z.string().optional(),
  duration: z.string().min(1, "A duração do projeto é obrigatória"),
  year: z.coerce.number<number>().min(1900).max(new Date().getFullYear()),
  demo_link: z.string().optional(),
  repo_link: z.string().optional(),
  cover: z.string(),
  about_project: z.string().min(30, "A descrição do projeto é obrigatória"),
  technologies: z
    .array(z.string().min(1, "Tecnologia não pode estar vazia"))
    .optional(),
  functionalities: z
    .array(z.string().min(1, "Funcionalidade não pode estar vazia"))
    .min(1, "Adicione ao menos uma funcionalidade"),
  gallery: z.array(z.string()).optional(),
  challenges: z
    .array(z.string().min(1, "Desafio não pode estar vazio"))
    .optional(),
  results: z
    .array(z.string().min(1, "Resultado não pode estar vazio"))
    .min(1, "Adicione ao menos um resultado"),
  status: z.enum(["ativo", "inativo"]),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const StoreProjectSchema = ProjectSchema.omit({
  _id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  cover: true,
  gallery: true,
  client_logo: true,
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
