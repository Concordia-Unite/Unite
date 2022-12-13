import type { ReactNode } from "react";
import Head from "next/head";
import { AppShell, Avatar, createStyles, Navbar } from "@mantine/core";
import { NavbarLink } from "@ui/NavbarLink";
import {
  IconHome2,
  IconListSearch,
  IconLogout,
  IconSettings,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  nav: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    marginBottom: 10,
    borderColor: theme.white,
    borderStyle: "solid",
    borderWidth: "2px",
  },
}));

interface Props {
  title: string;
  image?: string;
  children: ReactNode;
}

export function CandidateLayout(props: Props) {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <AppShell
        navbar={
          <Navbar className={classes.nav} width={{ base: 80 }} p="md">
            <Navbar.Section grow>
              <NavbarLink
                icon={IconHome2}
                label="Home"
                onClick={() => router.push("/candidates/me")}
              />
              <NavbarLink
                icon={IconListSearch}
                label="Placement Requests"
                onClick={() => router.push("/candidates/placement-requests")}
              />
              <NavbarLink
                icon={IconSettings}
                label="Settings"
                onClick={() => router.push("/candidates/settings")}
              />
            </Navbar.Section>
            <Navbar.Section mt={50}>
              <Avatar
                className={classes.avatar}
                mx={"auto"}
                radius="xl"
                src={props.image}
              />
              <NavbarLink
                icon={IconLogout}
                label="Logout"
                onClick={() => signOut()}
              />
            </Navbar.Section>
          </Navbar>
        }
      >
        {props.children}
      </AppShell>
    </>
  );
}
