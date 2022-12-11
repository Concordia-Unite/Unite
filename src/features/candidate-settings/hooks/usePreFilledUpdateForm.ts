/**
 * usePreFilledUpdateForm.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Candidate Settings Pre Filled Update Form Hook
 */

// Imports
import type { RouterOutputs } from "@services/trpc";
import { zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { updateFormValidator } from "../lib/update-form";
import { useUpdateForm } from "./useUpdateForm";

interface UsePreFilledUpdateFormArgs {
  candidate: RouterOutputs["candidate"]["getCurrent"];
}

/**
 * ### usePreFilledUpdateForm
 *
 * This prefills the update form with the current candidate's settings.
 * This includes the zod validator as well.
 */
export function usePreFilledUpdateForm(args: UsePreFilledUpdateFormArgs) {
  const form = useUpdateForm({
    initialValues: {
      name: "",
      wasRostered: false,
      districtId: -1,
      universityId: -1,
      profilePictureUrl: "",
    },
    validate: zodResolver(updateFormValidator),
  });

  useEffect(() => {
    if (args.candidate) {
      form.setValues({
        name: args.candidate.user.name ?? "",
        wasRostered: args.candidate.districtId ? true : false,
        districtId: args.candidate.districtId ?? -1,
        universityId: args.candidate.universityId ?? -1,
        profilePictureUrl: args.candidate.user.image ?? "",
      });
    }
  }, [args.candidate, form]);

  return form;
}
