import { ProjectTypes } from "@/_domain/projects/project.schema";

export default interface ResponseType {
  isSuccess?: boolean;
  project?: ProjectTypes;
  message?: {
    type: "success" | "error" | "info";
    text: string;
  };
}
