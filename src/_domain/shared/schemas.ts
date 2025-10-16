import { z } from "zod";

import { isValidCPF } from "@/lib/utils";
import { userCPFisUnique, userEMAILisUnique } from "../user/user.validation";

export const id = z.string().min(6, {
  message: "Nenhum usuário encontrado, por favor, verifique os dados",
});

export const detailedPasswordSchema = z
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

// Reutilizável: Validação genérica para a senha (usada no login)
export const genericPasswordSchema = z
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

// Reutilizável: Campos comuns de email
export const emailSchema = z
  .email({ message: "E-mail inválido" })
  .trim()
  .transform((e) => e.toLocaleLowerCase());

export const emailUniqueSchema = z
  .email({ message: "E-mail inválido" })
  .trim()
  .refine(async (email) => await userEMAILisUnique(email), {
    message: "Esse e-mail já foi cadastrado anteriormente",
  })
  .transform((e) => e.toLocaleLowerCase());

// Reutilizável: Nome completo
export const nameSchema = z
  .string()
  .min(6, { message: "O nome precisa ter no mínimo 6 caracteres" })
  .trim()
  .refine((name) => !/\d/.test(name), {
    message: "O nome não pode conter números",
  })
  .refine((name) => name.includes(" "), {
    message: "Informe o nome e sobrenome",
  });

// Reutilizável: CPF
export const cpfSchema = z
  .string()
  .transform((val) => val?.replace(/[^\d]+/g, ""))
  .refine((val) => isValidCPF(val), { message: "CPF inválido" });
export const cpfUniqueSchema = z
  .string()
  .transform((val) => val?.replace(/[^\d]+/g, ""))
  .refine((val) => isValidCPF(val), { message: "CPF inválido" })
  .refine(async (cpf) => await userCPFisUnique(cpf), {
    message: "CPF já cadastrado",
  });

// Reutilizável: Campos de telefone e celular
export const phoneSchema = z
  .string()
  .transform((val) => val?.replace(/\D/g, ""))
  .refine((val) => val?.length === 11, {
    message: "Informe um número de celular válido",
  });

export const optionalPhoneSchema = z
  .string()
  .transform((val) => val?.replace(/\D/g, "") || "")
  .refine((val) => !val || val.length === 0 || val.length === 10, {
    message: "Informe um número de telefone válido",
  })
  .optional();

export const cepSchema = z
  .string()
  .transform((val) => val.replace(/\D/g, ""))
  .refine((val) => val.length === 8, { message: "Informe um CEP válido" });
