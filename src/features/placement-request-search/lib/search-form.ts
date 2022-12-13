import { Grade } from "@enums/grade";
import { Position } from "@enums/position";
import { Region } from "@enums/region";
import { Variant } from "@enums/variant";
import { z } from "zod";

export const searchValidator = z.object({
  region: z.nativeEnum(Region).nullish(),
  districtId: z.number().nullish(),
  position: z.nativeEnum(Position).nullish(),
  variant: z.nativeEnum(Variant).nullish(),
  grades: z.nativeEnum(Grade).array(),
});

export type Search = z.infer<typeof searchValidator>;
