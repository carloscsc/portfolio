"use server";
import ResponseType from "@/_domain/shared/types/types";
import {
  StoreProjectTypes,
  StoreProjectSchema,
} from "../projects/project.schema";
import { Project } from "./project.model";
import connect from "@/lib/db";
import { upload } from "@/lib/upload";

export async function store(
  ProjectData: StoreProjectTypes
): Promise<ResponseType> {
  const validate = StoreProjectSchema.safeParse(ProjectData);

  if (!validate.success) {
    console.log(validate.error);
    return {
      isSuccess: false,
      message: {
        type: "error",
        text: "Dados inválidos. Verifique as informações e tente novamente.",
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
        gallery.map((image) => upload("portfolio/projects", image))
      );
      galleryUploadQueue.forEach((imagem) => uploadedGallery.push(imagem));
    }

    //build the projectObject
    const formattedProjectData = {
      ...data,
      cover: uploadedCover,
      gallery: uploadedGallery,
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
        text: "Error ao cadastrar novo projeto",
      },
    };
  }
}

export async function read() {
  try {
    await connect();
    const projects = await Project.find().lean();

    return {
      projects,
    };
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao buscar dados dos projetos");
  }
}
