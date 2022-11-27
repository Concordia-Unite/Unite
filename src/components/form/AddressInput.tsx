import { StateCode } from "@prisma/client";
import type { UseFormReturnType } from "@mantine/form";
import type { InputWrapperProps } from "@mantine/core";
import { Input, Grid, NativeSelect } from "@mantine/core";
import { IconBuildingSkyscraper, IconHome, IconRoad } from "@tabler/icons";
import ReactInputMask from "react-input-mask";

export interface Address {
  houseNumber: string;
  street: string;
  state: StateCode;
  city: string;
  country: string;
  zipCode: string;
}

interface AddressInputProps<T> extends Omit<InputWrapperProps, "children"> {
  form: UseFormReturnType<T>;
}

export function AddressInput<T extends { address: Address }>({
  form,
  ...rest
}: AddressInputProps<T>) {
  return (
    <>
      <Input.Wrapper {...rest}>
        <Grid grow>
          <Grid.Col lg={4} md={12}>
            <Input
              placeholder="House Number"
              icon={<IconHome />}
              {...form.getInputProps("address.houseNumber")}
            />
          </Grid.Col>
          <Grid.Col lg={4} md={12}>
            <Input
              placeholder="Your Street"
              icon={<IconRoad />}
              {...form.getInputProps("address.street")}
            />
          </Grid.Col>
          <Grid.Col lg={4} md={12}>
            <Input
              placeholder="Your City"
              icon={<IconBuildingSkyscraper />}
              {...form.getInputProps("address.city")}
            />
          </Grid.Col>
          <Grid.Col lg={4} md={12}>
            <NativeSelect
              placeholder="Your State"
              data={Object.keys(StateCode)}
              {...form.getInputProps("address.state")}
            />
          </Grid.Col>
          <Grid.Col lg={4} md={12}>
            <Input
              placeholder="Your Country Code"
              {...form.getInputProps("address.country")}
            />
          </Grid.Col>
          <Grid.Col lg={4} md={12}>
            <Input
              component={ReactInputMask}
              mask="99999"
              placeholder="Your Zip Code"
              {...form.getInputProps("address.zipCode")}
            />
          </Grid.Col>
        </Grid>
      </Input.Wrapper>
    </>
  );
}
