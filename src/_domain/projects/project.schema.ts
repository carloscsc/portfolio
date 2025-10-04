import { z } from "zod";

export const ProjectSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string().min(1, "O título é obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  client_name: z.string().min(1, "O nome do cliente é obrigatório"),
  client_description: z.string().min(1, "A descrição do cliente é obrigatória"),
  client_location: z.string().min(1, "A localização do cliente é obrigatória"),
  client_logo: z.string(),
  duration: z.string().min(1, "A duração do projeto é obrigatória"),
  year: z
    .string()
    .min(1, "Adicione a data do projeto")
    .max(4, "O ano deve ter no máximo 4 digitos"),
  demo_link: z.url().optional(),
  repo_link: z.url().optional(),
  cover: z.string(),
  about_project: z.string().min(30, "A descrição do projeto é obrigatória"),
  technologies: z
    .array(z.string().min(1, "Tecnologia não pode estar vazia"))
    .min(1, "Adicione ao menos uma tecnologia"),
  functionalities: z
    .array(z.string().min(1, "Funcionalidade não pode estar vazia"))
    .min(1, "Adicione ao menos uma funcionalidade"),
  gallery: z.array(z.string()).optional(),
  challenges: z
    .array(z.string().min(1, "Desafio não pode estar vazio"))
    .min(1, "Adicione ao menos um desafio"),
  results: z
    .array(z.string().min(1, "Resultado não pode estar vazio"))
    .min(1, "Adicione ao menos um resultado"),
  status: z.enum(["ativo", "inativo"]),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// TODO: separar
const fileSchema = z
  .instanceof(File, { message: "Arquivo é obrigatório" })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Arquivo deve ter no máximo 5MB",
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    { message: "Apenas imagens JPEG, PNG ou WebP são permitidas" }
  );

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

/** Types */
export type ProjectTypes = z.infer<typeof ProjectSchema>;
export type StoreProjectTypes = z.infer<typeof StoreProjectSchema>;
