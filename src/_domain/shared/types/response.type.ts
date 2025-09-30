import { ProjectTypes } from "@/_domain/projects/types";

export default interface ResponseType {
  isSuccess: boolean;
  project?: ProjectTypes;
  message?: {
    type: "success" | "error" | "info";
    text: string;
  };
}
