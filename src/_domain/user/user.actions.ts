// TODO: Melhorar segurança

"use server";
import { decrypt, getSession } from "@/lib/session";
import argon2 from "argon2";
import { ResponseType, SessionPayload } from "../shared/types";
import { UpdatePasswordSchema, updatePasswordType } from "./user.schema";
import { User } from "./user.model";
import connect from "@/lib/db";

/**
 * GET ONE USER
 */
export const findById = async (_id: string): Promise<ResponseType> => {
  try {
    await connect();
    const user = await User.findById({ _id }).select("-__v -password").lean();

    if (!user) {
      return {
        message: {
          type: "error",
          content: "O usuário não existe",
        },
      };
    }

    const { _id: oldId, ...data } = user;

    return {
      isSuccess: true,
      user: {
        ...data,
        _id: oldId.toString(),
      },
      message: {
        type: "success",
        content: "Usuário encontrado com sucesso!",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: {
        type: "error",
        content: "Erro oa buscar usuário, confira todos os dados",
      },
    };
  }
};

/**
 * UPDATE PASS
 */
export const userUpdatePassAction = async (
  data: updatePasswordType
): Promise<ResponseType | null> => {
  const validate = UpdatePasswordSchema.safeParse(data);
  if (!validate.success) {
    return {
      message: {
        type: "error",
        content: "Erro ao modificar a senha, verifique todos os dados",
      },
    };
  }

  const { token, password } = validate.data;
  let _id: SessionPayload["_id"] = "";

  if (token.split(".").length === 3) {
    const decryptedToken = await decrypt(token);

    if (!decryptedToken) {
      return {
        message: {
          type: "error",
          content: "Token inválido ou expirado",
        },
      };
    }

    _id = decryptedToken._id;
  } else {
    _id = token;
  }

  try {
    await connect();

    const user = await User.findById({ _id });

    if (!user) {
      return {
        message: {
          type: "error",
          content: "Token inválido ou expirado",
        },
      };
    }

    //  encripted password
    user.password = await argon2.hash(password);
    await user.save();

    return {
      isSuccess: true,
      message: {
        type: "success",
        content: "Senha alterada com sucesso!",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: {
        type: "error",
        content: "Erro ao alterar a senha, entre em contato com nosso suporte",
      },
    };
  }
};

/**
 * USR DTO
 */
export const userDTO = async (): Promise<ResponseType | null> => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    await connect();
    const user = await User.findById({ _id: session._id })
      .select("-password -__v")
      .lean();

    if (!user) {
      return null;
    }

    const { _id, ...userData } = user;

    return {
      user: {
        _id: _id.toString(),
        ...userData,
      },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
