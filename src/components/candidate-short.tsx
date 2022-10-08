/**
 * candidate-short.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Candidate Short Profile
 */

import {
  Avatar,
  Button,
  createStyles,
  Group,
  GroupPosition,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Candidate, CandidateAddress } from "@prisma/client";
import { IconPhone } from "@tabler/icons";
import { Address } from "./address";

type CandidateShortProps = {
  candidate: Candidate & { addresses: CandidateAddress[] };
  position: string | GroupPosition;
  alignment: string;
};

const useStyles = createStyles(() => ({
  profilePic: {
    minWidth: "25vh",
    minHeight: "25vh",
    padding: "1em",
  },
}));

export const CandidateShort = ({
  candidate,
  position,
  alignment,
}: CandidateShortProps) => {
  const { classes } = useStyles();

  return (
    <Group position={position as GroupPosition}>
      <Avatar
        src={candidate.profilePictureUrl}
        color="cyan"
        className={classes.profilePic}
      />
      <Stack align={alignment} justify="space-between">
        <Title>
          {candidate.firstName} {candidate.lastName}
        </Title>
        {candidate.phoneNumber !== "" && (
          <Group>
            <IconPhone />
            <Text color={"dimmed"}>{candidate.phoneNumber}</Text>
          </Group>
        )}
        {candidate.showAddress &&
          candidate.addresses.map((a) => <Address {...a} />)}
        <Group align={"center"}>
          <Button variant="light" size="md" radius={"xl"}>
            Extend a Call
          </Button>
        </Group>
      </Stack>
    </Group>
  );
};
