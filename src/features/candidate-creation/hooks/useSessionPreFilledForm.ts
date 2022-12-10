/**
 * useSessionPreFilledForm.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Pre-filled Candidate Creation Form
 */

// Imports
import { zodResolver } from "@mantine/form";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { creationFormValidator } from "../lib/creation-form";
import { useCreationForm } from "./useCreationForm";

/**
 * ### useSessionPreFilledForm
 * This prefills the form with the current session's data.
 * This also implements the zod validator for the form.
 *
 * @returns form
 */
export function useSessionPreFilledForm() {
  const form = useCreationForm({
    initialValues: {
      name: "",
      profilePictureUrl: "",
      wasRostered: false,
      districtId: -1,
      universityId: -1,
    },
    validate: zodResolver(creationFormValidator),
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
