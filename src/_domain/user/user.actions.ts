// TODO: Melhorar segurança

"use server";
import { decrypt, encrypt, getSession } from "@/lib/session";
import argon2 from "argon2";
import { ResponseType, SessionPayload } from "../shared/types";
import {
  UpdatePasswordSchema,
  updatePasswordType,
  UpdateUserSchema,
  updateUserTypes,
  UserChangeEmailSchema,
  userChangeEmailType,
  UserStoreSchema,
  UserStoreType,
} from "./user.schema";
import { User } from "./user.model";
import connect from "@/lib/db";

import { UpdateDataTableProps } from "@/components/tables/data-table";
import { QueryOptions } from "mongoose";
import { sendEmailVerifyAccount } from "@/lib/email";

/**
 * FIND USER
 */
export const find = async ({
  page,
  rowsPerPage,
  filterModel,
  sortModel,
  searchTerm,
}: UpdateDataTableProps) => {
  await connect();

  const query: QueryOptions = {};

  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    query.$or = [{ name: regex }, { email: regex }, { cpf: regex }];
  }

  if (filterModel.length > 0) {
    filterModel.forEach((f) => {
      if (Array.isArray(f.value)) {
        query[f.id] = new RegExp(f.value.join("|"), "i");
      } else {
        query[f.id] = new RegExp(f.value as string, "i");
      }
    });
  }

  const sort: Record<string, 1 | -1> = {};
  if (sortModel.length > 0) {
    const { id, desc } = sortModel[0];
    sort[id] = desc ? -1 : 1;
  }

  const skip = page * rowsPerPage;

  // Executar a consulta e obter os usuários e o total
  const [users, total] = await Promise.all([
    User.find(query)
      .skip(skip)
      .limit(rowsPerPage)
      .sort(sort)
      .select("-__v")
      .lean(),
    User.countDocuments(query),
  ]);

  const formattedUsers = users.map((user) => ({
    ...user,
    _id: user._id.toString(),
  }));
  return { userData: formattedUsers, total };
};

/**
 * GET ONE USER
 */
export const findById = async (_id: string): Promise<responseType> => {
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
 * CREATE A USER
 */
export const userStore = async (data: UserStoreType): Promise<responseType> => {
  const validate = await UserStoreSchema.safeParseAsync(data);

  if (!validate.success) {
    return {
      message: {
        type: "error",
        content: "Erro ao criar usuário, verifique todos os dados",
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, repeat, pergunta, ...rest } = validate.data;
  const role = "subscriber";
  const status = "pendent";
  const encryptPass = await argon2.hash(password);

  const userData = {
    ...rest,
    password: encryptPass,
    role,
    status,
  };

  try {
    await connect();
    const user = new User(userData);
    const { _id: newUserID } = await user.save();

    const _id = newUserID.toString();

    // create the payload
    const jwt = await encrypt({ _id, role });
    const token = `${process.env.NEXT_PUBLIC_BASE_URL}/verificacao?token=${jwt}`;

    try {
      await sendEmailVerifyAccount(user.email, { name: user.name, token });

      return {
        isSuccess: true,
        message: {
          type: "success",
          content:
            "Estamos quase lá! Precisamos verificar seu e-mail, um link de verificação foi enviado para o e-mail cadastrado, verifique sua caixa de entrada ou os spams",
        },
      };
    } catch (emailError) {
      console.log(emailError);
      await User.findByIdAndDelete(_id);
      return {
        message: {
          type: "error",
          content: "Erro ao criar usuário, verifique todos os dados",
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: {
        type: "error",
        content: "Erro ao criar usuário, verifique todos os dados",
      },
    };
  }
};

/**
 * UPDATE USER
 */
export const userUpdateData = async (
  data: updateUserTypes
): Promise<responseType | null> => {
  // TODO: Separar quando é feito por usuário VS Admin

  const validate = UpdateUserSchema.safeParse(data);

  if (!validate.success) {
    return {
      message: {
        type: "error",
        content: "Erro ao atualizar dados do usuário",
      },
    };
  }

  const formData = validate.data;

  try {
    await connect();
    const user = await User.findById({ _id: formData._id });

    if (!user) {
      return {
        message: {
          type: "error",
          content: "Erro ao atualizar os dados do usuário",
        },
      };
    }

    Object.assign(user, formData);
    await user.save();

    return {
      isSuccess: true,
      message: {
        type: "success",
        content: "Dados atualizados com sucesso!",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: {
        type: "error",
        content:
          "Erro ao alterar a usuário, entre em contato com nosso suporte",
      },
    };
  }
};

/**
 * UPDATE PASS
 */
export const userUpdatePassAction = async (
  data: updatePasswordType
): Promise<responseType | null> => {
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

  console.log(_id);

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
 * CHANGE E-MAIL
 */
export const userChangeEmail = async (
  data: userChangeEmailType
): Promise<responseType> => {
  const validate = await UserChangeEmailSchema.safeParseAsync(data);

  if (!validate.success) {
    return {
      message: {
        type: "error",
        content: "Erro ao modificar a e-mail, verifique todos os dados",
      },
    };
  }

  const { cpf, password, email } = validate.data;
  // const lowerCaseEmail = email.toLocaleLowerCase();

  try {
    await connect();

    // verify user
    const user = await User.findOne({ cpf });
    if (!user) {
      return {
        message: {
          type: "error",
          content: "CPF ou senha incorretos, verifique todos os dados",
        },
      };
    }

    // verify pass
    const verifyPass = await argon2.verify(user.password, password);
    if (!verifyPass) {
      return {
        message: {
          type: "error",
          content: "CPF ou senha incorretos, verifique todos os dados",
        },
      };
    }

    user.email = email;
    await user.save();

    // very new e-mail
    const jwt = await encrypt({ _id: user._id.toString() });
    const token = `${process.env.NEXT_PUBLIC_BASE_URL}/verificacao?token=${jwt}`;

    await sendEmailVerifyAccount(email, {
      name: user.name,
      token,
    });

    return {
      isSuccess: true,
      message: {
        type: "success",
        content:
          "E-mail alterado com sucesso, agora sua conta precisa ser validada antes do login, enviamos o link de validação para seu e-mail, verifique também a caixa de spam",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: {
        type: "error",
        content: "Erro ao modificar a e-mail, entre em contato com o suporte",
      },
    };
  }
};

/**
 * USR DTO
 */
export const userDTO = async (): Promise<responseType | null> => {
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

/**
 * VERIFY USER
 */
export const userValidate = async (token: string): Promise<responseType> => {
  const decryptedToken = await decrypt(token);

  if (!decryptedToken) {
    return { isSuccess: false };
  }

  const _id = decryptedToken._id;

  try {
    await connect();
    const user = await User.findById({ _id });

    if (!user) {
      return { isSuccess: false };
    }

    user.status = "verified";
    await user.save();

    // redirect
    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isSuccess: false };
  }
};

/**
 * Delete
 */
export const userDelete = async (_id: string): Promise<boolean> => {
  try {
    await connect();
    await User.findByIdAndDelete(_id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
