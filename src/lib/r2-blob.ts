import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { slugfy } from "@/lib/utils";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function upload(
  folder: string,
  file: File,
): Promise<string | boolean> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, nanoseconds] = process.hrtime();
  const nanoPart = nanoseconds.toString().padStart(9, "0");

  try {
    // rename
    const fileNameParts = file.name.split(".");
    const fileName = slugfy(fileNameParts.slice(0, -1).join("-"));
    const newFileName = `${fileName}-${nanoPart}`;
    const fileExtension = fileNameParts[fileNameParts.length - 1];

    //create the path
    const filePath = `${folder}/${newFileName}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
      Key: filePath,
      Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3Client.send(command);

    return filePath;
  } catch (error) {
    console.log(error);
    return false;
  }
}
