/*
 * header.tsx
 * Ian Kollipara
 * 2022-09-28
 *
 * Header Component
 */

// Imports
import {
  Header as MantineHeader,
  createStyles,
  Title,
  Group,
  Button,
  UnstyledButton,
} from "@mantine/core";
import type { DefaultProps } from "@mantine/styles";
import Link from "next/link";
import { IconLogin, IconLogout, IconUserCircle } from "@tabler/icons";
import { useSession, signOut } from "next-auth/react";

interface HeaderProps extends DefaultProps {}

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: "1.9em",

    [`@media (max-width: ${theme.breakpoints.sm}px`]: {
      fontSize: "1em",
    },

    [`@media (max-width: ${theme.breakpoints.md}px`]: {
      fontSize: "1em",
    },
  },

  signIn: {
    "&:hover": {
      backgroundColor: theme.colors["green"],
      color: "#fff",
    },
  },
}));

const Header = ({}: HeaderProps) => {
  const { classes } = useStyles();
  const { status } = useSession();

  return (
    <MantineHeader height={60}>
      <Group position="apart" sx={{ height: "100%" }} px={20}>
        <Title className={classes.title} order={2}>
          Unite
        </Title>
        {status === "authenticated" ? (
          <Link href="/profiles/me" passHref>
            <Button
              variant="subtle"
              leftIcon={<IconUserCircle />}
              component="a"
            >
              My Profile
            </Button>
          </Link>
        ) : (
          <Link href="/create-candidate" passHref>
            <Button
              variant="subtle"
              leftIcon={<IconUserCircle />}
              component="a"
            >
              Create a Profile
            </Button>
          </Link>
        )}
        {status === "authenticated" ? (
          <Button
            leftIcon={<IconLogout />}
            className={classes.signIn}
            onClick={() => signOut()}
            variant="outline"
            color="green"
            radius="xl"
          >
            Logout
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button
              leftIcon={<IconLogin />}
              className={classes.signIn}
              component="a"
              variant="outline"
              color="green"
              radius="xl"
            >
              Login
            </Button>
          </Link>
        )}
      </Group>
    </MantineHeader>
  );
};

export default Header;
