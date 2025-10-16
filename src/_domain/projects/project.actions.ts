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
import { upload } from "@/lib/upload";
import { clearFileName } from "@/lib/utils";

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
        content: "Dados inválidos. Verifique as informações e tente novamente.",
      },
    };
  }

  const { cover, client_logo, gallery, ...data } = validate.data;
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

    const uploadedClientLogo = await upload("portfolio/projects", client_logo);

    //build the projectObject
    const formattedProjectData = {
      ...data,
      cover: uploadedCover,
      gallery: uploadedGallery,
      client_logo: uploadedClientLogo,
      slug: clearFileName(data.title),
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

  const { _id, _gallery, gallery, cover, client_logo, ...rest } = validate.data;
  const uploadedGallery: string[] = [];
  let uploadedCover = null;
  let uploadedClientLogo = null;

  // update cover
  if (cover) {
    uploadedCover = await upload("portfolio/projects", cover);
  }

  // update logo
  if (client_logo) {
    uploadedClientLogo = await upload("portfolio/projects", client_logo);
  }

  // upload gallery
  if (gallery && gallery.length > 0) {
    const galleryUploadQueue = await Promise.all(
      gallery.map((image) => upload("portfolio/projects", image))
    );
    galleryUploadQueue.forEach((imagem) => uploadedGallery.push(imagem));
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
      client_logo: uploadedClientLogo || project.client_logo,
    };

    // monta o dado
    Object.assign(project, newData);

    await project.save();

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
    const projects = await Project.find().select("-__v").lean();

    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
    }));
  } catch (e) {
    console.log(e);
    throw new Error("Erro ao buscar dados dos projetos");
  }
}

export async function findOne(projectId: string): Promise<ProjectTypes | null> {
  if (!projectId) return null;

  try {
    await connect();
    const request = await Project.findById({ _id: projectId })
      .select("-__v")
      .lean();

    if (!request) return null;

    const { _id, ...project } = request;

    return {
      _id: _id.toString(),
      ...project,
    };
  } catch (error) {
    console.log(error);
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
