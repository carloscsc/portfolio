import z from "zod";

const detailedPasswordSchema = z
  .string()
  .trim()
  .min(8, { message: "A senha precisa ter no mínimo 8 caracteres" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "A senha precisa ter no mínimo uma letra maiúscula",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "A senha precisa ter no mínimo uma letra minúscula",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "A senha precisa ter no mínimo um número",
  })
  .refine((password) => /[^a-zA-Z0-9]/.test(password), {
    message: "A senha precisa ter no mínimo um caractere especial",
  });

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
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

export const UserTableSchema = UserSchema.extend({
  _id: z.string(),
});

/**
 * TYPES
 */
export type userTypes = z.infer<typeof UserSchema>;
export type updatePasswordType = z.infer<typeof UpdatePasswordSchema>;
export type userTableType = z.infer<typeof UserTableSchema>;
