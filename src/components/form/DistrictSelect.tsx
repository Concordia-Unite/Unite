import { Select, SelectProps } from "@mantine/core";

interface DistrictSelectProps extends Omit<SelectProps, "data"> {
  districts: { id: string; name: string }[];
}
export function DistrictSelect({ districts, ...rest }: DistrictSelectProps) {
  return (
    <>
      <Select
        data={districts.map((district) => ({
          label: `${district.name} District`,
          value: district.id,
        }))}
        {...rest}
      />
    </>
  );
}
