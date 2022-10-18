/**
 * layouts/candidate.tsx
 * Ian Kollipara
 * 2022.10.14
 *
 * Candidate Layout
 */

import { AppShell, Group, Title } from "@mantine/core";
import { IconMapSearch, IconSettings, IconUserCircle } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { ResponsiveHeader } from "../responsive-header";
import { LinkButton } from "../link-button";
import { LoginButton } from "../login-button";

interface LayoutProps {
  children: ReactNode;
}

const Header = () => {
  const { status } = useSession();
  return (
    <ResponsiveHeader brand={<Title>Unite</Title>}>
      <LinkButton
        href="/candidates/me"
        leftIcon={<IconUserCircle />}
        variant="subtle"
        color={"cyan"}
      >
        My Profile
      </LinkButton>
      <LinkButton
        href="/candidates/jobs"
        variant="subtle"
        leftIcon={<IconMapSearch />}
        color={"cyan"}
      >
        View Jobs
      </LinkButton>
      <LinkButton
        href="/candidates/settings"
        leftIcon={<IconSettings />}
        variant="subtle"
        color={"cyan"}
      >
        Settings
      </LinkButton>
      <LoginButton status={status} variant="subtle" color={"green"} />
    </ResponsiveHeader>
  );
};

export const CandidateLayout = ({ children }: LayoutProps) => {
  return <AppShell header={<Header />}>{children}</AppShell>;
};
