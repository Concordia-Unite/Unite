/**
 * NewMembershipInput.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * New Membership Form Component
 */

// Imports
import type { CreationForm } from "../lib/creation-form";
import type { UseFormReturnType } from "@mantine/form";
import { Role } from "@enums/role";
import { createStyles, Select, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons";

const useStyles = createStyles(() => ({
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

/**
 * ### NewMembershipInput
 *
 * This is the form for creating new members
 * It should be used with the provided form.
 */
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
