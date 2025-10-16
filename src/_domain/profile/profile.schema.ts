import { z } from "zod";
import { fileSchema, phoneSchema } from "../shared/types";

const badges = z.object({
  header: z
    .string()
    .min(1, "Informe o Header")
    .max(4, "texto do header precisa ter no máximo 4 caracteres"),
  text: z
    .string()
    .min(1, "Informe o Informe o texto")
    .max(20, "O texto pode ter no máximo 20 caracteres"),
});

export const ProfileSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "O nome é obrigatório"),
  title: z.string().min(1, "O título é obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(400, "A descrição não deve ter mais de 400 caracteres"),
  cover: z.string(),
  highlights: z.array(badges).min(2, "Informe ao menos 2 Highlights"),
  phone: phoneSchema,
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  profile_count: z.coerce.number<number>(),
});

export const StoreProfileSchema = ProfileSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  cover: true,
})
  .extend({
    cover: fileSchema.optional(),
    _cover: z.string().optional(),
  })
  .refine((data) => data.cover || data._cover, {
    message: "É necessário fornecer cover",
    path: ["cover"],
  });

/** Types */
export type ProfileTypes = z.infer<typeof ProfileSchema>;
export type storeProfileTypes = z.infer<typeof StoreProfileSchema>;
