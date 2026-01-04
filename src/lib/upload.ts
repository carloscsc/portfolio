// TODO: Adicionar validações
import { put } from "@vercel/blob";
import { slugfy } from "./utils";

interface UploadResult {
  pathname: string;
}

export async function upload(folder: string, file: File): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, nanoseconds] = process.hrtime();
  const nanoPart = nanoseconds.toString().padStart(9, "0");

  try {
    const fileNameParts = file.name.split(".");
    const fileName = slugfy(fileNameParts.slice(0, -1).join("-"));
    const newFileName = `${fileName}-${nanoPart}`;

    const fileExtension = fileNameParts[fileNameParts.length - 1];

    const filePath = `${folder}/${newFileName}.${fileExtension}`;
    const upload: UploadResult = await put(filePath, file, {
      access: "public",
      addRandomSuffix: false,
    });

    // // retornar o caminho do arquivo
    return upload.pathname;
  } catch (error) {
    throw new Error(`Erro ao fazer upload: ${error}`);
  }
}
