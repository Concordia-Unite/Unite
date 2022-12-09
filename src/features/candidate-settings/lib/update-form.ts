import { z } from "zod";

export const updateFormValidator = z.object({
  wasRostered: z.boolean(),
  universityId: z.number(),
  districtId: z.number(),
  name: z.string(),
  profilePictureUrl: z.string(),
});

export type UpdateForm = z.infer<typeof updateFormValidator>;
