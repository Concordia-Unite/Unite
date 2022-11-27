import { Select, SelectProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SocialSecurityContribution } from "@prisma/client";

interface SocialSecurityContributionSelectProps<T>
  extends Omit<SelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
}
export function SocialSecurityContributionSelect<
  T extends { socialSecurityContribution: SocialSecurityContribution }
>({ form, ...rest }: SocialSecurityContributionSelectProps<T>) {
  return (
    <>
      <Select
        data={Object.keys(SocialSecurityContribution).map(
          (socialSecurityContribution) => ({
            label: socialSecurityContribution.replaceAll("_", " "),
            value: socialSecurityContribution,
          })
        )}
        {...form.getInputProps("socialSecurityContribution")}
        {...rest}
      />
    </>
  );
}
