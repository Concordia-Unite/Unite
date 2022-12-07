import type { Variant } from "@enums/variant";

export interface CreationForm {
  name: string;
  districtId: number;
  variant: Variant;
}
