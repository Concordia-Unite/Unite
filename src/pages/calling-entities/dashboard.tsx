import type { GetServerSideProps } from "next";
import { createStyles, Loader, Title } from "@mantine/core";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContextInner } from "src/server/trpc/context";
import { getServerAuthSession } from "@server/get-server-auth-session";
import { useSession } from "next-auth/react";
import { trpc } from "@services/trpc";
import { CallingEntityDashboardLayout } from "@layouts/CallingEntityDashboardLayout";

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
  });

  try {
    if (!(await ssg.callingEntity.getCurrent.fetch())) {
      return {
        redirect: {
          destination: "/calling-entities/create",
        },
        props: {},
      };
    }
  } catch {
    return {
      redirect: {
        destination: "/login",
      },
      props: {},
    };
  }

  await ssg.auth.getSession.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default function Dashboard() {
  const { data: session } = useSession({ required: true });

  const { classes } = useStyles();
  const { data: entity } = trpc.callingEntity.getCurrent.useQuery();

  if (!entity || !session)
    return (
      <CallingEntityDashboardLayout title="Calling Entity Dashboard">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CallingEntityDashboardLayout>
    );

  return (
    <CallingEntityDashboardLayout
      image={session.user?.image ?? ""}
      title={`${entity.name} Dashboard`}
    >
      <Title order={1}>Dashboard</Title>
      <Title order={4}>For {entity.name}</Title>
    </CallingEntityDashboardLayout>
  );
}
