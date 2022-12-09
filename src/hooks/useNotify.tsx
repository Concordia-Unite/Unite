import { useId } from "@mantine/hooks";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

interface UseNotifyArgs {
  loading: string;
  success: string;
  failure: string;
}

export function useNotify<T>(args: UseNotifyArgs) {
  const id = useId();

  return async (p: Promise<T>) => {
    showNotification({
      id,
      message: args.loading,
      loading: true,
    });

    try {
      const res = await p;

      updateNotification({
        id,
        message: args.success,
        icon: <IconCheck />,
      });

      return res;
    } catch (e) {
      updateNotification({
        id,
        message: args.failure,
        icon: <IconX style={{ color: "red" }} />,
      });

      return e;
    }
  };
}
