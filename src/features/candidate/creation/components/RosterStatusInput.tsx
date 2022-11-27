/**
 * RosterStatusInput.tsx
 * Ian Kollipara
 * 2022.10.26
 *
 * Roster Status Input
 */
import { DistrictSelect } from "@components/form/DistrictSelect";
import { Select } from "@mantine/core";
import { useFormContext } from "../hooks/context";

interface RosterStatusInputProps {
  universities: { name: string; id: string }[];
  districts: { name: string; id: string }[];
  className?: string;
}

export function RosterStatusInput({
  universities,
  districts,
  className,
}: RosterStatusInputProps) {
  const form = useFormContext();
  if (form.values.isRostered) {
    return (
      <DistrictSelect
        districts={districts}
        label="Select Your District"
        description="As a rostered candidate, you are apart of your district's list of candidates. Please select the district in which you are/last were called."
        className={className}
        {...form.getInputProps("districtId")}
      />
    );
  } else {
    return (
      <Select
        data={universities.map((university) => ({
          label: university.name,
          value: university.id,
        }))}
        label="Select Your most recent University"
        description="As an unrostered candidate, you are apart of the list of graduates from you most recent LCMS place of graduation, usually a CUS University."
        required
        {...form.getInputProps("universityId")}
        className={className}
      />
    );
  }
}
