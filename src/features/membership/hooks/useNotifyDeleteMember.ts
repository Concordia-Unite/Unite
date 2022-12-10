import { useNotify } from "@hooks/useNotify";

export const useNotifyDeleteMember = () =>
  useNotify({
    loading: "Deleting Member now...",
    success: "Member successfully deleted!",
    failure: "Something went wrong",
  });
