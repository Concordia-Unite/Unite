import { useNotify } from "@hooks/useNotify";

export const useNotifyNewMember = () =>
  useNotify({
    loading: "Adding Member now...",
    success: "Member successfully added!",
    failure: "Something went wrong",
  });
