/**
 * default.tsx
 * Ian Kollipara
 * 2022.10.17
 *
 * Default (Non Account) Layout
 */

import { AppShell, Title } from "@mantine/core";
import { ReactNode } from "react";
import { LinkButton } from "../link-button";
import { LoginButton } from "../login-button";
import { ResponsiveHeader } from "../responsive-header";

interface LayoutProps {
  children: ReactNode;
}

const Header = () => (
  <ResponsiveHeader brand={<Title>Unite</Title>}>
    <LinkButton href="/signup" variant="default">
      Sign Up!
    </LinkButton>
    <LoginButton status="unauthenticated" variant="subtle" color={"green"} />
  </ResponsiveHeader>
);

export const DefaultLayout = ({ children }: LayoutProps) => (
  <AppShell padding={0} header={<Header />}>
    {children}
  </AppShell>
);
