/**
 * signup.tsx
 * Ian Kollipara
 * 2022.10.26
 *
 * Sign Up Page
 */

import { Stack, Title } from "@mantine/core";
import { HomeLayout } from "../layouts";
import { createStyles, ThemeIcon, Text, Group, Paper } from "@mantine/core";
import { IconSchool, IconUser } from "@tabler/icons";
import { LinkButton } from "../components/ui/LinkButton";

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export default function SignUp() {
  const { classes } = useStyles();

  return (
    <HomeLayout>
      <Title align="center">Create an Account with Unite</Title>
      <Stack mx={"xl"} px={"xl"}>
        <Paper
          radius={"md"}
          withBorder
          className={classes.card}
          mt={ICON_SIZE / 3}
        >
          <ThemeIcon
            className={classes.icon}
            size={ICON_SIZE}
            radius={ICON_SIZE}
          >
            <IconSchool />
          </ThemeIcon>
          <Text align="center" weight={700} className={classes.title}>
            Create an Organization
          </Text>
          <Text color={"dimmed"} align="center" size={"md"}>
            If you are a church or school looking to find LCMS Candidates, look
            no further.
          </Text>
          <Group position="center">
            <LinkButton variant="subtle" href="/organizations/create">
              Create an Account Now!
            </LinkButton>
          </Group>
        </Paper>
        <Paper
          radius={"md"}
          withBorder
          className={classes.card}
          mt={ICON_SIZE / 3}
        >
          <ThemeIcon
            className={classes.icon}
            size={ICON_SIZE}
            radius={ICON_SIZE}
          >
            <IconUser />
          </ThemeIcon>
          <Text align="center" weight={700} className={classes.title}>
            Create a Candidate
          </Text>
          <Text color={"dimmed"} align="center" size={"md"}>
            If you are a qualified LCMS Candidate and want to find your next
            call, look no further.
          </Text>
          <Group position="center">
            <LinkButton variant="subtle" href="/candidates/create">
              Create an Account Now!
            </LinkButton>
          </Group>
        </Paper>
      </Stack>
    </HomeLayout>
  );
}
