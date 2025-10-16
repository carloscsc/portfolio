import { z } from "zod";

const genericPasswordSchema = z
  .string()
  .trim()
  .refine(
    (value) => {
      return (
        value.length >= 8 &&
        /[a-zA-Z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[^a-zA-Z0-9]/.test(value)
      );
    },
    { message: "Senha Inválida" }
  );

const emailSchema = z
  .email({ message: "E-mail inválido" })
  .trim()
  .transform((e) => e.toLocaleLowerCase());

export const AuthLoginSchema = z.object({
  email: emailSchema,
  password: genericPasswordSchema,
});

export const AuthForgetPassFormSchema = z.object({
  email: emailSchema,
});

export const AuthResendTokenSchema = z.object({
  email: emailSchema,
});

/**
 * Types
 */
export type authLoginType = z.infer<typeof AuthLoginSchema>;
export type authForgetPassFormType = z.infer<typeof AuthForgetPassFormSchema>;
export type authResendTokenType = z.infer<typeof AuthResendTokenSchema>;
