import { z } from "zod";
import { fileSchema, phoneSchema } from "../shared/types";

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
    .max(400, "A descrição não deve ter mais de 400 caracteres"),
  highlights: z.array(HighlightSchema).min(2, "Informe ao menos 2 Highlights"),
  phone: phoneSchema,
});
export type translationContentType = z.infer<typeof translationContentSchema>;

const translationsSchema = z.object({
  en: translationContentSchema,
  br: translationContentSchema,
});

export const ContatoSchema = z.object({
  linkedin: z.url().optional(),
  github: z.url().optional(),
  email: z.email().optional(),
});
export type ContatoType = z.infer<typeof ContatoSchema>;

export const ProfileSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "O nome é obrigatório"),
  cover: z.string(),
  translations: translationsSchema,
  contato: ContatoSchema.default({}).nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StoreProfileSchema = ProfileSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  cover: true,
})
  .extend({
    _id: z.string().optional(),
    cover: fileSchema.optional(),
    _cover: z.string().optional(),
    contato: z
      .transform((val, ctx) => {
        if (!val || val === "") return {};

        if (typeof val === "string") {
          try {
            return JSON.parse(val);
          } catch {
            ctx.issues.push({
              code: "custom",
              message: "Invalid JSON format for social field",
              input: val,
            });
            return z.NEVER;
          }
        }
        return val;
      })
      .pipe(ContatoSchema.strict()),
  })
  .refine((data) => data.cover || data._cover, {
    message: "É necessário fornecer cover",
    path: ["cover"],
  });

/** Types */
export type ProfileTypes = z.infer<typeof ProfileSchema>;
export type storeProfileTypes = z.infer<typeof StoreProfileSchema>;
