/**
 * settings.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Candidate Settings
 */

import { AppShell, Avatar, Title, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const useStyles = createStyles(() => ({
  profilePic: {
    minWidth: "25vh",
    minHeight: "25vh",
    padding: "1em",
  },
}));

const Settings: NextPage = () => {
  const router = useRouter();
  const { classes } = useStyles();

  const candidate = trpc.candidate.getByUid.useQuery({
    uid: useSession({ required: true }).data?.user?.id as string,
    includeAddresses: true,
    includeEducation: true,
    includeSchools: true,
  });

  const settingsForm = useForm({
    initialValues: {
      profilePictureUrl: candidate.data?.profilePictureUrl,
      biography: candidate.data?.biography,
      email: candidate.data?.email,
      firstName: candidate.data?.firstName,
      lastName: candidate.data?.lastName,
      showAddress: candidate.data?.showAddress,
      attended: candidate.data?.attended,
      addresses: candidate.data?.addresses,
    },
  });

  return (
    <AppShell>
      <Title>User Settings</Title>
      <Avatar
        component="button"
        src={settingsForm.values.profilePictureUrl}
        color="cyan"
        className={classes.profilePic}
      >
        Click to Set
      </Avatar>
    </AppShell>
  );
};

export default Settings;
