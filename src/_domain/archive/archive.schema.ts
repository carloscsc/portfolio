import { z } from "zod";

// Schema
export const TagSchema = z.object({
  _id: z.string().optional(),
  label: z.string(),
  value: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type TagType = z.infer<typeof TagSchema>;

export type TagStoreResponseType = {
  tag?: TagType;
  error?: string;
};
