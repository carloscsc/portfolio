import { z } from "zod";
import { TagSchema } from "../archive/archive.schema";
import { DocFileSchema, fileSchema, phoneSchema } from "../shared/types";

const HighlightSchema = z.object({
  header: z
    .string()
    .min(1, "Informe o Header")
    .max(4, "texto do header precisa ter no máximo 4 caracteres"),
  text: z
    .string()
    .min(1, "Informe o Informe o texto")
    .max(20, "O texto pode ter no máximo 20 caracteres"),
});
export type highlightType = z.infer<typeof HighlightSchema>;

const translationContentSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(800, "A descrição não deve ter mais de 800 caracteres"),
  highlights: z.array(HighlightSchema).min(2, "Informe ao menos 2 Highlights"),
  phone: phoneSchema,
  cv: z.string().optional(),
});
export type translationContentType = z.infer<typeof translationContentSchema>;

// Translation CreateSchema
const translationContentStoreSchema = translationContentSchema
  .omit({ cv: true })
  .extend({
    cv: DocFileSchema.optional(),
    _cv: z.string().optional(),
  });

const translationsSchema = z.object({
  en: translationContentSchema.omit({ phone: true }).extend({
    phone: z.string().min(6, "telefone é obrigatório"),
  }),
  br: translationContentSchema,
});

// Translation StoreSchema
const translationsStoreSchema = z.object({
  en: translationContentStoreSchema.omit({ phone: true }).extend({
    phone: z.string().min(6, "telefone é obrigatório"),
  }),
  br: translationContentStoreSchema,
});

export const ContatoSchema = z.object({
  linkedin: z.url().optional(),
  github: z.url().optional(),
  email: z.email().optional(),
});
export type ContatoType = z.infer<typeof ContatoSchema>;

const TechStackSchema = z.object({
  name: z.string().min(3),
  technologies: z.array(TagSchema).min(1),
});
export type techStackType = z.infer<typeof TechStackSchema>;

const TechStackStoreSchema = z.object({
  name: z.string().min(3),
  technologies: z.array(z.string()).min(1),
});
export type techStackStoreType = z.infer<typeof TechStackStoreSchema>;

export const ProfileSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "O nome é obrigatório"),
  cover: z.string(),
  translations: translationsSchema,
  contato: ContatoSchema.optional(),
  skills: z.array(TechStackStoreSchema).min(1),
  _skills: z.array(TechStackSchema).min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StoreProfileSchema = ProfileSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  cover: true,
  translations: true,
})
  .extend({
    _id: z.string().optional(),
    cover: fileSchema.optional(),
    _cover: z.string().optional(),
    translations: translationsStoreSchema,
  })
  .refine((data) => data.cover || data._cover, {
    message: "É necessário fornecer cover",
    path: ["cover"],
  });

/** Types */
export type ProfileTypes = z.infer<typeof ProfileSchema>;
export type storeProfileTypes = z.infer<typeof StoreProfileSchema>;
