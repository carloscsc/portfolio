import { z } from "zod";
import { phoneSchema } from "../shared/types";

export const CttSchema = z.object({
  name: z.string().refine((val) => val?.length > 3, {
    params: { format: "name" },
  }),
  email: z.email(),
  phone: phoneSchema.optional(),
  message: z.string(),
});

export type CttType = z.infer<typeof CttSchema>;
