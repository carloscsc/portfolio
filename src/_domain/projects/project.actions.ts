"use server";
import { ResponseType } from "@/_domain/shared/types";
import {
  StoreProjectTypes,
  StoreProjectSchema,
  ProjectTypes,
  UpdateProjectTypes,
  UpdateProjectSchema,
} from "../projects/project.schema";
import { Project } from "./project.model";
import connect from "@/lib/db";
import { upload } from "@/lib/r2-blob";
import { slugfy } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export async function store(
  ProjectData: StoreProjectTypes,
): Promise<ResponseType> {
  const validate = StoreProjectSchema.safeParse(ProjectData);

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

  const { cover, gallery, ...data } = validate.data;
  const uploadedGallery: string[] = [];

  try {
    // Upload cover image
    const uploadedCover = await upload("portfolio/projects", cover);

    // upload gallery
    if (gallery && gallery.length > 1) {
      const galleryUploadQueue = await Promise.all(
        gallery.map((image) => upload("portfolio/projects", image)),
      );
      galleryUploadQueue.forEach((imagem) =>
        uploadedGallery.push(imagem as string),
      );
    }

    //build the projectObject
    const formattedProjectData = {
      ...data,
      cover: uploadedCover,
      gallery: uploadedGallery,
      slug: slugfy(data.translations.en.title),
    };

    await connect();

    const project = new Project(formattedProjectData);
    const savedProject = await project.save();

    return {
      isSuccess: true,
      project: savedProject.toJSON(),
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

export async function update(data: UpdateProjectTypes): Promise<ResponseType> {
  const validate = UpdateProjectSchema.safeParse(data);

  if (!validate.success) {
    console.log(validate.error);
    return {
      message: {
        type: "error",
        content: "Erro ao atualizar projeto verifique todos os campos",
      },
    };
  }

  const { _id, _gallery, gallery, cover, ...rest } = validate.data;
  const uploadedGallery: string[] = [];
  let uploadedCover = null;

  // update cover
  if (cover) {
    uploadedCover = await upload("portfolio/projects", cover);
  }

  // upload gallery
  if (gallery && gallery.length > 0) {
    const galleryUploadQueue = await Promise.all(
      gallery.map((image) => upload("portfolio/projects", image)),
    );
    galleryUploadQueue.forEach((imagem) =>
      uploadedGallery.push(imagem as string),
    );
  }
  const newGallery = [...uploadedGallery, ...(_gallery || [])];

  try {
    await connect();
    const project = await Project.findById({ _id });

    if (!project) {
      return {
        message: {
          type: "error",
          content: "Erro ao atualizar projeto verifique todos os campos",
        },
      };
    }

    const newData = {
      ...rest,
      gallery: newGallery,
      cover: uploadedCover || project.cover,
    };

    // monta o dado
    Object.assign(project, newData);

    await project.save();

    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);

    return {
      isSuccess: true,
      message: {
        type: "error",
        content: "Projeto atualizado com sucesso",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: {
        type: "error",
        content: "Erro ao atualizar projeto verifique todos os campos",
      },
    };
  }
}

export async function read() {
  try {
    await connect();
    const results = await Project.aggregate([
      {
        $sort: { updatedAt: -1 },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "value",
          as: "_category",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "technologies",
          foreignField: "value",
          as: "tags",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "client_id",
          foreignField: "slug",
          as: "_client",
        },
      },
      {
        $unwind: {
          path: "$_client",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          _id: { $toString: "$_id" },
          "_client._id": { $toString: "$_client._id" },
        },
      },
      {
        $unset: ["__v", "createdAt", "updatedAt"],
      },
    ]);

    if (!results || results.length === 0) return null;

    return results;
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao buscar dados dos projetos");
  }
}

// find by tag
export async function findByTag(tag: string | null = null) {
  // await new Promise((resolver) => setTimeout(resolver, 3000));

  try {
    await connect();
    const results = await Project.aggregate([
      {
        $match: { technologies: tag },
      },
      {
        $sort: { updatedAt: -1 },
      },
      {
        $lookup: {
          from: "tags",
          localField: "technologies",
          foreignField: "value",
          as: "tags",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "value",
          as: "_category",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "client_id",
          foreignField: "slug",
          as: "_client",
        },
      },
      {
        $unwind: {
          path: "$_client",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          _id: { $toString: "$_id" },
          "_client._id": { $toString: "$_client._id" },
        },
      },
      {
        $unset: ["__v", "createdAt", "updatedAt"],
      },
    ]);

    if (!results || results.length === 0) return null;

    return results;
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao buscar dados dos projetos");
  }
}

// Find By Category
export async function findByCategory(tag: string | null = null) {
  // await new Promise((resolver) => setTimeout(resolver, 3000));

  try {
    await connect();
    const results = await Project.aggregate([
      {
        $match: { category: tag },
      },
      {
        $sort: { updatedAt: -1 },
      },
      {
        $lookup: {
          from: "tags",
          localField: "technologies",
          foreignField: "value",
          as: "tags",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "value",
          as: "_category",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "client_id",
          foreignField: "slug",
          as: "_client",
        },
      },
      {
        $unwind: {
          path: "$_client",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          _id: { $toString: "$_id" },
          "_client._id": { $toString: "$_client._id" },
        },
      },
      {
        $unset: ["__v", "createdAt", "updatedAt"],
      },
    ]);

    if (!results || results.length === 0) return null;

    return results;
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao buscar dados dos projetos");
  }
}

export async function findOne(slug: string): Promise<ProjectTypes | null> {
  if (!slug) return null;

  try {
    await connect();
    const results = await Project.aggregate([
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: "tags",
          localField: "technologies",
          foreignField: "value",
          as: "tags",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "value",
          as: "_category",
          pipeline: [{ $project: { _id: 0, label: 1, value: 1 } }],
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "client_id",
          foreignField: "slug",
          as: "_client",
        },
      },
      {
        $unwind: {
          path: "$_client",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          _id: { $toString: "$_id" },
          "_client._id": { $toString: "$_client._id" },
        },
      },
      {
        $unset: ["__v", "createdAt", "updatedAt"],
      },
    ]);

    if (!results || results.length === 0) return null;

    return results[0];
  } catch {
    return null;
  }
}

export async function deleteProject(_id: string): Promise<ResponseType> {
  try {
    await connect();

    await Project.findByIdAndDelete({ _id });

    return {
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: {
        type: "error",
        content: "Erro ao excluir projeto",
      },
    };
  }
}

// get cached projeto
export const getAndCacheProject = cache(
  async (slug: string): Promise<ProjectTypes | null> => {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${slug}`,
    );

    if (!request.ok) {
      return null;
    }

    return await request.json();
  },
);
