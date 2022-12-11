/* 

Membership
==========

Handles the updating, creating, displaying, and deleting of members for
universities, districts, and calling entities. This includes a few custom
notification hooks, as well as a Zod validator.

*/

import { NewMemberInput } from "./components/NewMemberInput";
import { useCreationForm } from "./hooks/useCreationForm";
import { MembershipTable } from "./components/MembershipTable";
import { creationFormValidator } from "./lib/creation-form";
import { useNotifyNewMember } from "./hooks/useNotifyNewMember";
import { useNotifyUpdateMember } from "./hooks/useNotifyUpdateMember";
import { useNotifyDeleteMember } from "./hooks/useNotifyDeleteMember";

// Export Barrel
export {
  NewMemberInput,
  useCreationForm,
  MembershipTable,
  creationFormValidator,
  useNotifyDeleteMember,
  useNotifyNewMember,
  useNotifyUpdateMember,
};
