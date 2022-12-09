import { Role } from "@enums/role";
import { createStyles, NativeSelect, Select, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { IconAt } from "@tabler/icons";
import type { CreationForm } from "../lib/creation-form";

const useStyles = createStyles((theme) => ({
  textbox: {
    width: "20vw",
    marginRight: "1em",
  },
  selectbox: {
    width: "30vw",
    marginRight: "1em",
  },
}));

interface Props {
  form: UseFormReturnType<CreationForm>;
}

export function NewMemberInput(props: Props) {
  const { classes } = useStyles();
  return (
    <>
      <TextInput
        className={classes.textbox}
        placeholder="Member Name..."
        required
        {...props.form.getInputProps("name")}
      />
      <TextInput
        className={classes.textbox}
        icon={<IconAt />}
        placeholder="Email"
        type={"email"}
        required
        {...props.form.getInputProps("email")}
      />
      <Select
        className={classes.selectbox}
        data={Object.values(Role)}
        required
        {...props.form.getInputProps("role")}
      />
    </>
  );
}
