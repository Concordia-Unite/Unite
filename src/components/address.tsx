/**
 * address.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Address Component
 */

import { Group, Text } from "@mantine/core";
import { CandidateAddress, School } from "@prisma/client";
import { IconHome } from "@tabler/icons";

type AddressProps =
  | Omit<CandidateAddress, "candidateId">
  | School
  | {
      houseNumber: string;
      street: string;
      state: string;
      country: string;
      zipCode: string;
    };

export const Address = ({
  houseNumber,
  street,
  state,
  country,
  zipCode,
}: AddressProps) => (
  <Group>
    <IconHome />
    <Text color={"dimmed"}>
      {houseNumber} {street} {state} {country} {zipCode}
    </Text>
  </Group>
);
