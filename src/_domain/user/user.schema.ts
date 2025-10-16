import z from "zod";
import {
  cepSchema,
  cpfSchema,
  cpfUniqueSchema,
  detailedPasswordSchema,
  emailSchema,
  emailUniqueSchema,
  genericPasswordSchema,
  nameSchema,
  optionalPhoneSchema,
  phoneSchema,
} from "../shared/schemas";
import { isValidDate } from "@/lib/utils";

export const UserSchema = z.object({
  name: nameSchema,
  nascimento: z.string().refine((date) => isValidDate(date), {
    message: "Informe uma data de nascimento válida",
  }),
  cel: phoneSchema,
  tel: optionalPhoneSchema,
  email: emailSchema,
  cpf: cpfUniqueSchema,
  password: z.string(),
  cep: cepSchema,
  endereco: z.string().min(1, "Informe o endereço").trim(),
  numero: z.string().optional(),
  complemento: z.string().trim().optional(),
  bairro: z
    .string()
    .min(1, "Informe o bairro")
    .trim()
    .refine((bairro) => !/\d/.test(bairro), {
      message: "Cidade não pode conter números",
    }),
  cidade: z
    .string()
    .min(1, "Informe a cidade")
    .trim()
    .refine((cidade) => !/\d/.test(cidade), {
      message: "Cidade não pode conter números",
    }),
  uf: z
    .string()
    .min(1, "Informe o estado")
    .min(2, "Informe o cep")
    .trim()
    .refine((uf) => !/\d/.test(uf), {
      message: "UF não pode conter números",
    }),
  role: z.enum(["admin", "subscriber"]),
  status: z.enum(["pendent", "verified"]),
  marketing: z.boolean().optional(),
});

export const UserStoreSchema = UserSchema.omit({
  password: true,
  email: true,
  status: true,
  role: true,
})
  .extend({
    email: emailUniqueSchema,
    password: detailedPasswordSchema,
    repeat: z.string().trim(),
    termos: z.literal(true).refine((val) => val === true, {
      message: "Você deve concordar com os termos",
    }),
    pergunta: z.literal("Opt 1").refine((val) => val === "Opt 1", {
      message: "Resposta inválida...",
    }),
  })
  .refine((data) => data.password === data.repeat, {
    message: "As senhas não coincidem",
    path: ["repeat"], // Local onde o erro será mostrado
  });

export const UpdateUserSchema = UserSchema.partial()
  .omit({
    cpf: true,
    email: true,
  })
  .extend({
    _id: z.string(),
    cpf: cpfSchema,
    email: emailSchema,
  });

export const UpdatePasswordSchema = z
  .object({
    token: z.string(),
    password: detailedPasswordSchema,
    repeat: z.string().trim(),
  })
  .refine((data) => data.password === data.repeat, {
    message: "As senhas não coincidem",
    path: ["repeat"], // Local onde o erro será mostrado
  });

export const UserChangeEmailSchema = z.object({
  cpf: cpfSchema,
  password: genericPasswordSchema,
  email: emailUniqueSchema,
});

export const UserTableSchema = UserSchema.extend({
  _id: z.string(),
});

/**
 * TYPES
 */
export type userTypes = z.infer<typeof UserSchema>;
export type UserStoreType = z.infer<typeof UserStoreSchema>;
export type updateUserTypes = z.infer<typeof UpdateUserSchema>;
export type updatePasswordType = z.infer<typeof UpdatePasswordSchema>;
export type userChangeEmailType = z.infer<typeof UserChangeEmailSchema>;
export type userTableType = z.infer<typeof UserTableSchema>;
