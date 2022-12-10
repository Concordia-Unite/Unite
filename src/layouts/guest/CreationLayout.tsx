import type { ReactNode } from "react";
import Head from "next/head";
import { AppShell } from "@mantine/core";
import { Header } from "@ui/Header";

interface Props {
  title: string;
  children: ReactNode;
}

export function CreationLayout(props: Props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <AppShell header={<Header />}>{props.children}</AppShell>
    </>
  );
}
