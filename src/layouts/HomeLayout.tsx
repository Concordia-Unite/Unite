import type {ReactNode} from "react";
import {AppShell} from "@mantine/core";
import {UniteHeader} from "@components/ui/UniteHeader";

interface HomeLayoutProps {
  children: ReactNode

}
export function HomeLayout({children}: HomeLayoutProps) {
  return (
    <>
      <AppShell padding={0} header={<UniteHeader />}>
        {children}
      </AppShell>
    </>
  )
}