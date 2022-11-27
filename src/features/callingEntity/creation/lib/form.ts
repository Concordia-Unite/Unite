import type { Variant } from "@prisma/client";
import type { Address } from "@components/form/AddressInput";

export interface FormValues {
  name: string;
  variant: Variant;
  districtId: string;
  address: Address;
}
