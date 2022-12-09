import { zodResolver } from "@mantine/form";
import type { RouterOutputs } from "@services/trpc";
import { useEffect } from "react";
import { updateFormValidator } from "../lib/update-form";
import { useUpdateForm } from "./useUpdateForm";

interface UsePreFilledUpdateFormArgs {
  candidate: RouterOutputs["candidate"]["getCurrent"];
}

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
