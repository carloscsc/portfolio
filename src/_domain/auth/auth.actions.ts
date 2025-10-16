"use server";

import {
  AuthForgetPassFormSchema,
  authForgetPassFormType,
  AuthLoginSchema,
  authLoginType,
  AuthResendTokenSchema,
  authResendTokenType,
} from "./auth.schema";
import { ResponseType } from "../shared/types";
import connect from "@/lib/db";
import { User } from "../user/user.model";
import argon2 from "argon2";
import { createSession, deleteSession, encrypt } from "@/lib/session";

import { revalidatePath } from "next/cache";
import {
  sendEmailForgotPasswordLink,
  sendEmailVerifyAccount,
} from "@/lib/email";

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
        text: "Dados de login inválidos, verifique todos os campos e tente novamente",
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
          text: "Usuário ou senha incorretos, verifique os dados",
        },
      };
    }

    // verify password
    const verifyPass = await argon2.verify(user.password, password);
    if (!verifyPass) {
      return {
        message: {
          type: "error",
          text: "Usuário ou senha incorretos, verifique os dados",
        },
      };
    }

    // verify user status
    if (user.status !== "verified") {
      return {
        message: {
          type: "info",
          text: 'Sua conta precisa ser verificada antes de realizar o login. Confira seu e-mail ou clique em "Problemas para logar" para gerar um novo link de verificação',
        },
      };
    }

    //create the token
    const token = await encrypt({ _id: user._id.toString(), role: user.role });
    await createSession(token);

    return {
      isSuccess: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: {
        type: "error",
        text: "Erro ao logar, por favor, entre em contato com o suporte",
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
        text: "Erro ao solicitar alteração de senha, verifique todos os dados",
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
          text: "Usuário não encontrado",
        },
      };
    }

    // create the token
    const token = await encrypt({ _id: user._id.toString() });
    // cria a URL
    const tokenURL = `${process.env.NEXT_PUBLIC_BASE_URL}/mudar-senha?token=${token}`;

    await sendEmailForgotPasswordLink(lowerCaseEmail, {
      name: user.name,
      token: tokenURL,
    });

    return {
      isSuccess: true,
      message: {
        type: "success",
        text: "Link de redefinição enviado com sucesso, siga o passo a passo no seu e-mail",
      },
    };
  } catch (e) {
    console.log(e);
    return {
      message: {
        type: "error",
        text: "Erro ao recuperar senha, entre em contato com o nosso suporte",
      },
    };
  }
};

/**
 * RESEND TOKEN
 */
export const authResendToken = async (
  data: authResendTokenType
): Promise<ResponseType> => {
  const validate = AuthResendTokenSchema.safeParse(data);

  if (!validate.success) {
    return {
      message: {
        type: "error",
        text: "Erro ao reenviar token, confira todos os dados",
      },
    };
  }

  const { email } = validate.data;

  try {
    await connect();

    const user = await User.findOne({ email }).select("_id name status").lean();

    if (!user) {
      return {
        message: {
          type: "error",
          text: "Nenhum usuário encontrado, verifique os dados",
        },
      };
    }

    if (user.status === "verified") {
      console.log("sim");
      return {
        isSuccess: true,
        message: {
          type: "info",
          text: "Usuário já verificado, faça login",
        },
      };
    }

    const { _id, name } = user;

    // create the token
    const jwt = await encrypt({ _id: _id.toString() });
    const token = `${process.env.NEXT_PUBLIC_BASE_URL}/verificacao?token=${jwt}`;

    // send e-mail
    await sendEmailVerifyAccount(email, { name, token });

    return {
      message: {
        type: "success",
        text: "Código de verificação enviado com sucesso, confira seu e-mail e a caixa de spam",
      },
    };
  } catch (error) {
    console.log(error);

    return {
      message: {
        type: "error",
        text: "Erro ao reenviar token, entre em contato com nosso suporte",
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
