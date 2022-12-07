import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useCreationForm } from "./useCreationForm";

export function useSessionPreFilledForm() {
  const form = useCreationForm({
    initialValues: {
      name: "",
      profilePictureUrl: "",
      wasRostered: false,
      districtId: -1,
      universityId: -1,
    },
  });

  useEffect(() => {
    getSession().then((s) => {
      if (s)
        form.setValues({
          name: s.user?.name ?? "",
          profilePictureUrl: s.user?.image ?? "",
        });
    });
  }, [form]);

  return form;
}
