"use server";

import {
  AuthForgetPassFormSchema,
  authForgetPassFormType,
  AuthLoginSchema,
  authLoginType,
} from "./auth.schema";
import { ResponseType } from "../shared/types";
import connect from "@/lib/db";
import { User } from "../user/user.model";
import argon2 from "argon2";
import { createSession, deleteSession, encrypt } from "@/lib/session";

import { revalidatePath } from "next/cache";

import { getLocale } from "next-intl/server";
import { sendEmailForgotPasswordLinkEN } from "@/lib/email/templates/en/sendEmailForgotPasswordLink-en";
import { sendEmailForgotPasswordLinkBR } from "@/lib/email/templates/br/sendEmailForgotPasswordLink-br";

/**
 * LOGIN
 */
export const authLoginAction = async (
  data: authLoginType
): Promise<ResponseType | void> => {
  const validate = AuthLoginSchema.safeParse(data);

  if (!validate.success) {
    return {
      message: {
        type: "error",
        content:
          "Dados de login inválidos, verifique todos os campos e tente novamente",
      },
    };
  }

  const { email, password } = validate.data;
  const lowerCaseEmail = email.toLocaleLowerCase();

  try {
    await connect();
    const user = await User.findOne({ email: lowerCaseEmail })
      .lean()
      .select("_id password status role");

    // case user not exit
    if (!user) {
      return {
        message: {
          type: "error",
          content: "Usuário ou senha incorretos, verifique os dados",
        },
      };
    }

    // verify password
    const verifyPass = await argon2.verify(user.password, password);
    if (!verifyPass) {
      return {
        message: {
          type: "error",
          content: "Usuário ou senha incorretos, verifique os dados",
        },
      };
    }

    //create the token
    const token = await encrypt({ _id: user._id.toString() });
    await createSession(token);

    return {
      isSuccess: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: {
        type: "error",
        content: "Erro ao logar, por favor, entre em contato com o suporte",
      },
    };
  }
};

/**
 * FORGET PASS
 */
export const authForgetpassAction = async (
  data: authForgetPassFormType
): Promise<ResponseType | void> => {
  const validate = AuthForgetPassFormSchema.safeParse(data);

  if (!validate.success) {
    return {
      message: {
        type: "error",
        content:
          "Erro ao solicitar alteração de senha, verifique todos os dados",
      },
    };
  }

  const { email } = validate.data;
  const lowerCaseEmail = email.toLocaleLowerCase();

  try {
    await connect();

    const user = await User.findOne({ email: lowerCaseEmail })
      .select("_id name")
      .lean();

    if (!user) {
      return {
        message: {
          type: "error",
          content: "Usuário não encontrado",
        },
      };
    }

    // create the token
    const token = await encrypt({ _id: user._id.toString() });
    // cria a URL
    const tokenURL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/mudar-senha?token=${token}`;

    const locale = await getLocale();

    console.log(locale);

    const sendEmail =
      locale === "en"
        ? sendEmailForgotPasswordLinkEN
        : sendEmailForgotPasswordLinkBR;

    await sendEmail(lowerCaseEmail, {
      name: "Usuário",
      token: tokenURL,
    });

    return {
      isSuccess: true,
      message: {
        type: "success",
        content:
          "Link de redefinição enviado com sucesso, siga o passo a passo no seu e-mail",
      },
    };
  } catch (e) {
    console.log(e);
    return {
      message: {
        type: "error",
        content:
          "Erro ao recuperar senha, entre em contato com o nosso suporte",
      },
    };
  }
};

/**
 * LOGOUT
 */
export const logout = async (): Promise<boolean> => {
  await deleteSession();
  revalidatePath("/");
  return true;
};
