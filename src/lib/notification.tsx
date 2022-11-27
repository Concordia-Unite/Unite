import {showNotification, updateNotification} from "@mantine/notifications";
import {IconCheck, IconCircleX} from "@tabler/icons";

interface Message {
  onLoading: string;
  onSuccess: string;
  onFailure: string;
}

export async function notify<T>(id: string, title: string, message: Message, promise: Promise<T>) {
  showNotification({
    id,
    title,
    message: message.onLoading,
    loading: true
  });

  try {
    const val = await promise;
    updateNotification({
      id,
      title,
      message: message.onSuccess,
      loading: false,
      icon: <IconCheck/>
    });
    return val;
  } catch (error) {
    updateNotification({
      id,
      title,
      message: message.onFailure,
      loading: false,
      icon: <IconCircleX color={"red"}/>
    });
    throw error;
  }
}