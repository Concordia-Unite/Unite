import type { ReactNode } from "react";
import Head from "next/head";
import { AppShell, createStyles } from "@mantine/core";
import { Header } from "@ui/Header";

const useStyles = createStyles(() => ({
  wrapper: {
    backgroundImage: `url(https://unsplash.it/2000/2000)`,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    objectFit: "cover",
    objectPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

interface Props {
  title: string;
  children: ReactNode;
}

export function LoginLayout(props: Props) {
  const { classes } = useStyles();
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <AppShell className={classes.wrapper} header={<Header />}>
        {props.children}
      </AppShell>
    </>
  );
}
