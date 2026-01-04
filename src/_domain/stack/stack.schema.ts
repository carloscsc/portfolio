import { z } from "zod";
import { fileSchema } from "../shared/types";

// Schema
export const TechTagsSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TechTagTypes = z.infer<typeof TechTagsSchema>;

// Store
export const TechTagStoreSchema = TechTagsSchema.omit({
  _id: true,
  cover: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  cover: fileSchema,
});

export type TechTagStoreType = z.infer<typeof TechTagStoreSchema>;

// update
export const TechTagUpdateSchema = TechTagsSchema.extend({
  _cover: fileSchema,
});

export type techTagUpdateType = z.infer<typeof TechTagUpdateSchema>;
