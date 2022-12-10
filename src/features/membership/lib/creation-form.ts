import { z } from "zod";
import { Role } from "@enums/role";

export const creationFormValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(Role),
});

export type CreationForm = z.infer<typeof creationFormValidator>;
