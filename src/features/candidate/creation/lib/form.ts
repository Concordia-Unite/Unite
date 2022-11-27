import type { Address } from "@components/form/AddressInput";

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  isRostered: boolean;
  universityId: string;
  districtId: string;
  description: string;
  address: Address;
}
