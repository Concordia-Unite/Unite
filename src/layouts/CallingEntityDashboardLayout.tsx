import type { ReactNode } from "react";
import Head from "next/head";
import { AppShell, Avatar, createStyles, Navbar, NavLink } from "@mantine/core";
import { NavbarLink } from "@ui/NavbarLink";
import {
  IconHome2,
  IconListSearch,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUsers,
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

export function CallingEntityDashboardLayout(props: Props) {
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
                label="Dashboard"
                onClick={() => router.push("/calling-entities/dashboard")}
              />
              <NavbarLink
                icon={IconUsers}
                label="Members"
                onClick={() => router.push("/calling-entities/members")}
              />
              <NavbarLink
                icon={IconListSearch}
                label="Create Placement Request"
                onClick={() =>
                  router.push("/calling-entities/placement-requests/create")
                }
              />
              <NavbarLink
                icon={IconSettings}
                label="Settings"
                onClick={() => router.push("/calling-entities/settings")}
              />
            </Navbar.Section>
            <Navbar.Section>
              <Avatar
                src={props.image}
                mx={"auto"}
                radius={"xl"}
                className={classes.avatar}
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
