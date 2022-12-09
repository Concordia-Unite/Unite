import { Grade } from "@enums/grade";
import { Position } from "@enums/position";
import {
  //   createStyles,
  Input,
  MultiSelect,
  NativeSelect,
  Switch,
  TextInput,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";
import { DescriptionEditor } from "./DescriptionEditor";

// const useStyles = createStyles((theme) => ({
//   //
// }));

interface Props {
  form: UseFormReturnType<CreationForm>;
}

export function BasicInput(props: Props) {
  return (
    <>
      <NativeSelect
        label="What Position are you looking for?"
        required
        data={Object.values(Position)}
        {...props.form.getInputProps("position")}
      />
      <MultiSelect
        label="Select what grades you are looking for?"
        description="If your entity does not work with grades, use them as the age range"
        required
        data={Object.values(Grade)}
        searchable
        clearable
        {...props.form.getInputProps("grades")}
      />
      <TextInput
        label="Subject"
        description="What subject are you looking for?"
        required
        {...props.form.getInputProps("subject")}
      />
      <Input.Wrapper label="Description of Request" required>
        <DescriptionEditor form={props.form} />
      </Input.Wrapper>
      <Switch
        label="Is it Tenured?"
        {...props.form.getInputProps("isTenured")}
      />
      <Switch
        label="Is it Full Time?"
        {...props.form.getInputProps("isFullTime")}
      />
    </>
  );
}
