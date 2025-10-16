import z from "zod";

import { detailedPasswordSchema } from "../shared/schemas";

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
