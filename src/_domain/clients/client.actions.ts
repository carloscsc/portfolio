"use server";

import { ResponseType } from "@/_domain/shared/types";
import connect from "@/lib/db";
import { upload } from "@/lib/r2-blob";
import { slugfy } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { Client } from "./clients.model";
import {
  StoreClientSchema,
  StoreClientType,
  UpdateClientSchema,
  UpdateClientType,
} from "./clients.schema";

export async function store(
  clientData: StoreClientType,
): Promise<ResponseType> {
  const validate = StoreClientSchema.safeParse(clientData);

  if (!validate.success) {
    console.log(validate.error);
    return {
      isSuccess: false,
      message: {
        type: "error",
        content: "Dados inválidos. Verifique as informações e tente novamente.",
      },
    };
  }

  const { client_logo, ...data } = validate.data;

  try {
    const uploadedLogo = await upload("portfolio/clients", client_logo);

    const formattedClientData = {
      ...data,
      client_logo: uploadedLogo,
      slug: slugfy(data.client_name),
    };

    await connect();

    const client = new Client(formattedClientData);
    await client.save();

    revalidatePath("/admin/clients");

    return {
      isSuccess: true,
      message: {
        type: "success",
        content: "Cliente cadastrado com sucesso",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: {
        type: "error",
        content: "Erro ao cadastrar novo cliente",
      },
    };
  }
}

export async function update(data: UpdateClientType): Promise<ResponseType> {
  const validate = UpdateClientSchema.safeParse(data);

  if (!validate.success) {
    console.log(validate.error);
    return {
      message: {
        type: "error",
        content: "Erro ao atualizar cliente, verifique todos os campos",
      },
    };
  }

  const { _id, client_logo, _client_logo, ...rest } = validate.data;
  let uploadedLogo = null;

  if (client_logo) {
    uploadedLogo = await upload("portfolio/clients", client_logo);
  }

  try {
    await connect();
    const client = await Client.findById({ _id });

    if (!client) {
      return {
        message: {
          type: "error",
          content: "Cliente não encontrado",
        },
      };
    }

    const newData = {
      ...rest,
      client_logo: uploadedLogo || _client_logo || client.client_logo,
    };

    Object.assign(client, newData);

    await client.save();

    revalidatePath("/admin/clients");

    return {
      isSuccess: true,
      message: {
        type: "success",
        content: "Cliente atualizado com sucesso",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: {
        type: "error",
        content: "Erro ao atualizar cliente, verifique todos os campos",
      },
    };
  }
}

export async function read() {
  try {
    await connect();
    const results = await Client.aggregate([
      {
        $sort: { updatedAt: -1 },
      },
      {
        $addFields: {
          _id: { $toString: "$_id" },
        },
      },
      {
        $unset: ["__v", "createdAt", "updatedAt"],
      },
    ]);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function findOne(slug: string) {
  try {
    await connect();
    const client = await Client.findOne({ slug }).select("-__v").lean();

    if (!client) {
      return null;
    }

    return {
      ...client,
      _id: client._id.toString(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
