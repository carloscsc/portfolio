import { z } from "zod";

// Schema
export const TechTagsSchema = z.object({
  _id: z.string().optional(),
  label: z.string(),
  value: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type TechTagTypes = z.infer<typeof TechTagsSchema>;

export type TechTagStoreResponseType = {
  tag?: TechTagTypes;
  error?: string;
};
