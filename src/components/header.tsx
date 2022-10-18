/**
 * header.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Header Component
 */

import { Button, createStyles, Divider, Title } from "@mantine/core";
import { IconLogin, IconLogout, IconUserCircle } from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";
import { ResponsiveHeader } from "./responsive-header";
import { LinkButton } from "./link-button";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));

export const Header = () => {
  const { classes } = useStyles();
  const { status } = useSession();
  return (
    <ResponsiveHeader>
      <Title>Unite</Title>
      <Divider className={classes.hiddenDesktop} />
      <LinkButton
        href="/candidates/me"
        variant="subtle"
        color={"cyan"}
        leftIcon={<IconUserCircle />}
      >
        My Profile
      </LinkButton>
      {status === "authenticated" ? (
        <Button
          leftIcon={<IconLogout />}
          variant="subtle"
          color={"green"}
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      ) : (
        <LinkButton
          href={"/login"}
          variant="subtle"
          leftIcon={<IconLogin />}
          color="green"
        >
          Sign in
        </LinkButton>
      )}
    </ResponsiveHeader>
  );
};
