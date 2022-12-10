import { useNotify } from "@hooks/useNotify";

export const useNotifyUpdateMember = () =>
  useNotify({
    loading: "Updated Member now...",
    success: "Member successfully updated!",
    failure: "Something went wrong",
  });
