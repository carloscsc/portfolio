"use server";
import { updateTag } from "next/cache";
import { cache } from "react";
import type { ResponseType } from "@/_domain/shared/types";
import connect from "@/lib/db";
import { upload } from "@/lib/r2-blob";
import { Profile } from "./profile.model";
import {
  type ProfileTypes,
  StoreProfileSchema,
  type storeProfileTypes,
} from "./profile.schema";

export async function UpdateOrCreate(
  ProjectData: storeProfileTypes,
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

  const { _id, cover, _cover, ...data } = validate.data;
  let uploadedCover: string | boolean = false,
    uploadedEnCV: string | boolean = false,
    uploadedBrCv: string | boolean = false;

  try {
    if (cover) {
      uploadedCover = await upload("portfolio/profile", cover);
    }

    if (data.translations.en.cv) {
      uploadedEnCV = await upload("portfolio/profile", data.translations.en.cv);
    }

    if (data.translations.br.cv) {
      uploadedBrCv = await upload("portfolio/profile", data.translations.br.cv);
    }

    await connect();

    const filter = _id ? { _id } : {};

    await Profile.findOneAndUpdate(
      filter,
      {
        $set: {
          cover: uploadedCover || _cover,
          ...data,
          translations: {
            ...data.translations, // ← Precisa disso aqui
            en: {
              ...data.translations.en, // ← E aqui
              cv: uploadedEnCV || data.translations.en._cv,
            },
            br: {
              ...data.translations.br, // ← E aqui
              cv: uploadedBrCv || data.translations.br._cv,
            },
          },
        },
        $setOnInsert: {},
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );

    // Cache
    updateTag("profile");

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

export async function read(): Promise<ProfileTypes | null> {
  try {
    await connect();

    const results = await Profile.aggregate([
      { $limit: 1 },
      {
        $lookup: {
          from: "tags",
          localField: "_skills.technologies",
          foreignField: "value",
          as: "_allTags",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $addFields: {
          _id: { $toString: "$_id" },
          skills: {
            $map: {
              input: "$_skills",
              as: "skill",
              in: {
                name: "$$skill.name",
                technologies: {
                  $filter: {
                    input: "$_allTags",
                    as: "tag",
                    cond: { $in: ["$$tag.value", "$$skill.technologies"] },
                  },
                },
              },
            },
          },
        },
      },
      {
        $unset: ["_allTags", "__v"],
      },
    ]);

    if (!results || results.length === 0) {
      return null;
    }

    return results[0] as ProfileTypes;
  } catch (e) {
    console.error("Error fetching profile:", e);
    throw new Error("Erro ao buscar dados do perfil");
  }
}

// get cached profile
export const getAndCacheProfile = cache(
  async (): Promise<ProfileTypes | null> => {
    // await new Promise((resolver) => setInterval(resolver, 2500));
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
      { next: { tags: ["profile"] } },
    );

    if (!request.ok) {
      return null;
    }

    return await request.json();
  },
);
