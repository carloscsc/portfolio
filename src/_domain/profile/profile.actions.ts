"use server";
import { ResponseType } from "@/_domain/shared/types";
import {
  StoreProjectTypes,
  StoreProjectSchema,
} from "../projects/project.schema";
import connect from "@/lib/db";
import { upload } from "@/lib/r2-blob";
import { clearFileName } from "@/lib/utils";
import { StoreProfileSchema, storeProfileTypes } from "./profile.schema";
import { Profile } from "./profile.model";

export async function UpdateOrCreate(
  ProjectData: storeProfileTypes
): Promise<ResponseType> {
  const validate = StoreProfileSchema.safeParse(ProjectData);

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

  const { cover, _cover, ...data } = validate.data;
  let uploadedCover;

  try {
    if (cover) {
      uploadedCover = await upload("portfolio/profile", cover);
    }

    await connect();

    const profile = await Profile.findOneAndUpdate(
      { profile_count: 1 },
      {
        $set: {
          cover: uploadedCover || _cover,
          ...data,
        },
        $setOnInsert: {},
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    return {
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: {
        type: "error",
        content: "Error ao cadastrar novo projeto",
      },
    };
  }
}

export async function read() {
  try {
    await connect();
    const profile = await Profile.findOne({ profile_count: 1 })
      .select("-__v")
      .lean();

    if (!profile) {
      return null;
    }

    const { _id, highlights, ...data } = profile;

    return {
      ...data,
      _id: _id.toString(),
      highlights: highlights.map((h) => ({
        header: h.header,
        text: h.text,
      })),
    };
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao buscar dados dos projetos");
  }
}
