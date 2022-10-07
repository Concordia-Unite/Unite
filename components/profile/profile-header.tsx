/**
 * profile-header.tsx
 * Ian Kollipara
 * 2022.10.05
 *
 * Profile Header Component
 */

// Imports
import {
  Avatar,
  Group,
  GroupPosition,
  createStyles,
  useMantineTheme,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import type {
  Candidate,
  CandidateAddress,
  CandidateEducation,
  School,
} from "@prisma/client";
import { IconPhone } from "@tabler/icons";
import { Address } from "../address";
import { CallButton } from "../call-button";

type FullCandidate = Candidate & {
  addresses: CandidateAddress[];
  attended: (CandidateEducation & { at: School })[];
};

type ProfileHeaderProps = {
  candidate: FullCandidate;
  position: GroupPosition | string;
  alignment: string;
};

const useStyles = createStyles(() => ({
  profilePic: {
    minWidth: "25vh",
    minHeight: "25vh",
    padding: "1em",
  },
}));

const ProfileHeader = ({
  candidate,
  position,
  alignment,
}: ProfileHeaderProps) => {
  const { classes } = useStyles();

  const { width } = useViewportSize();
  const { breakpoints } = useMantineTheme();

  return (
    <Group position={position as GroupPosition}>
      <Avatar
        className={classes.profilePic}
        color="cyan"
        src={candidate.profilePictureUrl}
      />
      <Stack align={alignment} justify="space-between">
        <Title>
          {candidate.firstName} {candidate.lastName}
        </Title>
        <Group>
          <IconPhone />
          <Text color={"dimmed"}>{candidate.phoneNumber}</Text>
        </Group>
        <Group>
          {candidate.showAddress &&
            candidate.addresses.map((a) => <Address address={a} />)}
        </Group>
        <CallButton addPadding={width > breakpoints.md} />
      </Stack>
    </Group>
  );
};

export default ProfileHeader;
