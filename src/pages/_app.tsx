import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { RouterTransition } from "@components/ui/RouteTransition";
import "../utils/superjson";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MantineProvider withCSSVariables withNormalizeCSS>
      <ModalsProvider>
        <NotificationsProvider position="top-center">
          <SessionProvider session={session}>
            <RouterTransition />
            <Component {...pageProps} />
          </SessionProvider>
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default trpc.withTRPC(MyApp);
