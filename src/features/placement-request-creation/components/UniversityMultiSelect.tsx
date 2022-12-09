import { createStyles, MultiSelect } from "@mantine/core";
import type { Position, University } from "@prisma/client";
import type { Position as PositionEnum } from "@enums/position";
import { useMemo } from "react";
import type { UseFormReturnType } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props {
  universities: (University & {
    positions: Position[];
  })[];
  position: PositionEnum;
  form: UseFormReturnType<CreationForm>;
}

export function UniversityMultiSelect(props: Props) {
  const currentUniversities = useMemo(
    () =>
      props.universities.filter((uni) =>
        uni.positions
          .map((pos) => pos.position)
          .includes(props.position.valueOf())
      ),
    [props.position, props.universities]
  );
  return (
    <>
      <MultiSelect
        label="Select Universities to alert"
        description="Do you want this request to be visible to Preservice Candidates?"
        data={currentUniversities.map((uni) => ({
          label: uni.name,
          value: uni.id.toString(),
        }))}
        value={props.form.values.universities.map((v) => v.toString())}
        onChange={(v) =>
          props.form.setFieldValue("universities", v.map(Number))
        }
      />
    </>
  );
}
