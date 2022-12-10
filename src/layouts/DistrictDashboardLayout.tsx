import type { ReactNode } from "react";
import Head from "next/head";
import { AppShell, Avatar, createStyles, Navbar } from "@mantine/core";
import { useRouter } from "next/router";
import { NavbarLink } from "@ui/NavbarLink";
import {
  IconHome2,
  IconList,
  IconLogout,
  IconSettings,
  IconUsers,
} from "@tabler/icons";
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

export function DistrictDashboardLayout(props: Props) {
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
                onClick={() => router.push("/districts/dashboard")}
              />
              <NavbarLink
                icon={IconUsers}
                label="Members"
                onClick={() => router.push("/districts/members")}
              />
              <NavbarLink
                icon={IconList}
                label="Placement Requests"
                onClick={() => router.push("/districts/placement-requests")}
              />
              <NavbarLink
                icon={IconSettings}
                label="Settings"
                onClick={() => router.push("/districts/settings")}
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
