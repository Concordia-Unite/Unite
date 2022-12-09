import { getServerAuthSession } from "@server/get-server-auth-session";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createContextInner } from "../trpc/context";
import { appRouter } from "../trpc/router/_app";
import superjson from "superjson";
import { type GetServerSidePropsContext } from "next";

export const getTRPCServerProxy = async (
  context: GetServerSidePropsContext
) => {
  return createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session: await getServerAuthSession(context),
    }),
    transformer: superjson,
  });
};

export type TRPCServerProxy = Awaited<ReturnType<typeof getTRPCServerProxy>>;
