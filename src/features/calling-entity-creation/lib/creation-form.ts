import { z } from "zod";
import { Variant } from "@enums/variant";

export const creationFormValidator = z.object({
  name: z.string(),
  districtId: z.number(),
  variant: z.nativeEnum(Variant),
});

export type CreationForm = z.infer<typeof creationFormValidator>;
