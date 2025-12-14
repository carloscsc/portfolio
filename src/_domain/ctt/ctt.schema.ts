import { z } from "zod";

export const CttSchema = z.object({
  name: z.string().refine((val) => val?.length > 3, {
    params: { format: "name" },
  }),
  email: z.email(),
  message: z.string(),
});

export type CttType = z.infer<typeof CttSchema>;
