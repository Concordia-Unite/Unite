import { Grid, Input } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface NameInputProps<T> {
  form: UseFormReturnType<T>;
  label?: string;
  description?: string;
  required?: boolean;
}
export function NameInput<T extends { firstName: string; lastName: string }>({
  form,
  label,
  description,
  required,
}: NameInputProps<T>) {
  return (
    <>
      <Input.Wrapper
        label={label}
        description={description}
        required={required}
      >
        <Grid grow>
          <Grid.Col lg={6} md={12}>
            <Input
              placeholder={"First Name..."}
              {...form.getInputProps("firstName")}
            />
          </Grid.Col>
          <Grid.Col lg={6} md={12}>
            <Input
              placeholder={"Last Name..."}
              {...form.getInputProps("lastName")}
            />
          </Grid.Col>
        </Grid>
      </Input.Wrapper>
    </>
  );
}
