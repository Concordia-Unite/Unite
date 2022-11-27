import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/trpc/router/_app";
import { createContextInner } from "../../server/trpc/context";
import superjson from "superjson";
import { trpc } from "../../utils/trpc";
import { CallingEntityLayout } from "@layouts/CallingEntityLayout";
import { Title } from "@mantine/core";
import Head from "next/head";
import { PlacementRequestTable } from "@features/placementRequest/board";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session,
    }),
    transformer: superjson,
  });
  if (!session)
    return {
      redirect: {
        destination: "/login",
      },
      props: {},
    };

  await ssg.callingEntity.getCurrent.prefetch();
  await ssg.callingEntity.getPlacementRequests.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function CallingEntityDashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: callingEntity } = trpc.callingEntity.getCurrent.useQuery();
  const { data: placementRequests } =
    trpc.callingEntity.getPlacementRequests.useQuery();

  return (
    <>
      <Head>
        <title>Unite - {callingEntity?.name}</title>
      </Head>
      <CallingEntityLayout>
        <Title align={"center"}>{callingEntity?.name}</Title>
        <PlacementRequestTable
          placementRequests={placementRequests ?? []}
          view={"withDelete"}
          for_={"calling-entity"}
        />
      </CallingEntityLayout>
    </>
  );
}
