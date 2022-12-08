import type { Role } from "@enums/role";

export interface CreationForm {
  name: string;
  email: string;
  role: Role;
}
