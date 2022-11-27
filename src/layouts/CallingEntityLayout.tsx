import { AppShell, createStyles, Navbar } from "@mantine/core";
import { CallingEntity, PlacementRequest } from "@prisma/client";
import type { ReactNode } from "react";
import { UniteHeader } from "@components/ui/UniteHeader";
import { NavbarLink } from "@components/ui/NavbarLink";
import {
  IconHome2,
  IconInputSearch,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
} from "@tabler/icons";
import { LogoutButton } from "@components/ui/LogoutButton";

interface CallingEntityLayoutProps {
  children: ReactNode;
}

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& > *": {
      marginTop: "1em",
    },
  },
}));

export function CallingEntityLayout({ children }: CallingEntityLayoutProps) {
  const { classes } = useStyles();
  return (
    <>
      <AppShell
        navbar={
          <Navbar width={{ base: 80 }} className={classes.navbar}>
            <Navbar.Section grow>
              <NavbarLink
                icon={IconHome2}
                label={"Home"}
                href={"/calling-entity/dashboard"}
              />
              <NavbarLink
                icon={IconInputSearch}
                label={"Create Placement Request"}
                href={"/calling-entity/placement-requests/create"}
              />
              <NavbarLink
                icon={IconSettings}
                label={"Settings"}
                href={"/calling-entity/settings"}
              />
            </Navbar.Section>
            <Navbar.Section mb={"md"}>
              <NavbarLink
                icon={IconSwitchHorizontal}
                label={"Switch Accounts"}
                href={"/candidates/dashboard"}
              />
              <LogoutButton />
            </Navbar.Section>
          </Navbar>
        }
        header={<UniteHeader modifier={"for Calling Entities"} />}
      >
        {children}
      </AppShell>
    </>
  );
}
