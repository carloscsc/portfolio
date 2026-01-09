import { z } from "zod";

/**
 * TAGS
 */
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

/**
 * Categ
 */
export const CategSchema = z.object({
  _id: z.string().optional(),
  label: z.string(),
  value: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type CategType = z.infer<typeof CategSchema>;

export type CategStoreResponseType = {
  category?: TagType;
  error?: string;
};
