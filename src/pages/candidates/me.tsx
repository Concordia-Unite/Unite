import { InferGetServerSidePropsType } from "next";
import type { GetServerSideProps } from "next";
import { createStyles, Loader, Title } from "@mantine/core";
import { CandidateDashboardLayout } from "@layouts/CandidateDashboardLayout";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContextInner } from "src/server/trpc/context";
import { getServerAuthSession } from "@server/get-server-auth-session";
import superjson from "superjson";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },
  dashboard: {
    height: "100%",
    width: "100%",
    [theme.fn.largerThan("lg")]: {
      width: "60wv",
    },
  },
}));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session: await getServerAuthSession(context),
    }),
    transformer: superjson,
  });

  await ssg.candidate.getCurrent.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default function Dashboard() {
  // _: InferGetServerSidePropsType<typeof getServerSideProps>;
  useSession({ required: true });
  const { classes } = useStyles();
  const { data: candidate } = trpc.candidate.getCurrent.useQuery();

  if (!candidate)
    return (
      <CandidateDashboardLayout title="Dashboard">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CandidateDashboardLayout>
    );

  return (
    <CandidateDashboardLayout
      image={candidate.user.image ?? ""}
      title="Dashboard"
    >
      <main className={classes.dashboard}>
        <Title order={1}>Dashboard</Title>
        <Title order={5}>Welcome {candidate.user.name}!</Title>
      </main>
    </CandidateDashboardLayout>
  );
}
