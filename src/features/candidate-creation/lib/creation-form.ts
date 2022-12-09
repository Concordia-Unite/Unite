import { z } from "zod";

export const creationFormValidator = z.object({
  wasRostered: z.boolean(),
  universityId: z.number(),
  districtId: z.number(),
  name: z.string(),
  profilePictureUrl: z.string().default(""),
});

export type CreationForm = z.infer<typeof creationFormValidator>;
