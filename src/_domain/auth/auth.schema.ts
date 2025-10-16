import { emailSchema, genericPasswordSchema } from "@/_domain/shared/schemas";
import { z } from "zod";

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
