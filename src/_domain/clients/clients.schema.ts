import { z } from "zod";
import { fileSchema } from "../shared/types";

export const ClientSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  client_name: z.string().min(1, "O nome do cliente é obrigatório"),
  client_location: z.string().optional(),
  client_logo: z.string(),
  client_link: z.string().optional(),
  client_description: z.string().optional(),
  client_description_br: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StoreClientSchema = ClientSchema.omit({
  _id: true,
  slug: true,
  client_logo: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  client_logo: fileSchema,
});

export const UpdateClientSchema = ClientSchema.partial()
  .omit({
    client_logo: true,
  })
  .extend({
    client_logo: fileSchema.optional(),
    _client_logo: z.string().optional(),
  });

export type ClientType = z.infer<typeof ClientSchema>;
export type StoreClientType = z.infer<typeof StoreClientSchema>;
export type UpdateClientType = z.infer<typeof UpdateClientSchema>;
