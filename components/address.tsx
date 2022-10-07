import { Group, Text } from "@mantine/core";
import { CandidateAddress, School } from "@prisma/client";
import { IconHome } from "@tabler/icons";

type AddressProps = {
  address:
    | CandidateAddress
    | { houseNumber: string; street: string; state: string; zipCode: string }
    | School;
};

export const Address = ({ address }: AddressProps) => (
  <Group>
    <IconHome />
    <Text color={"dimmed"}>
      {address.houseNumber} {address.street} {address.state} {address.zipCode}
    </Text>
  </Group>
);

export default Address;
