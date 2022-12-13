import { Grade } from "@enums/grade";
import { Position } from "@enums/position";
import { Region } from "@enums/region";
import { Variant } from "@enums/variant";
import { DistrictSelect } from "@form/DistrictSelect";
import { createStyles, MultiSelect, Select } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { RouterOutputs } from "@services/trpc";
import type { Search } from "../lib/search-form";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props {
  form: UseFormReturnType<Search>;
  districts: RouterOutputs["district"]["getAll"];
}

export function SearchFilters(props: Props) {
  return (
    <>
      <Select
        label="Position"
        clearable
        description="What position are you looking for?"
        data={Object.values(Position)}
        {...props.form.getInputProps("position")}
      />
      <Select
        label="Type of Calling Entity"
        clearable
        description="What type of school/church/body do you want to find?"
        data={Object.values(Variant)}
        {...props.form.getInputProps("variant")}
      />
      <Select
        label="LCMS Region"
        clearable
        description="What region do you want to find?"
        data={Object.values(Region)}
        {...props.form.getInputProps("region")}
      />
      {/* <MultiSelect
        label="Grades/Ages"
        clearable
        description="What age/grades are you looking for?"
        data={Object.values(Grade)}
        {...props.form.getInputProps("grades")}
      /> */}
      <DistrictSelect
        clearable
        description="Select the what district you want a placement Request in in"
        data={props.districts}
        onChange={(v) => props.form.setFieldValue("districtId", Number(v))}
        value={props.form.values.districtId?.toString()}
      />
    </>
  );
}
