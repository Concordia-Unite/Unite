import type { GetServerSideProps } from "next";
import { createStyles, Loader, Title } from "@mantine/core";
import { CandidateDashboardLayout } from "@layouts/CandidateDashboardLayout";
import { createTRPCSSGProxy, trpc } from "@services/trpc";
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
  const ssg = await createTRPCSSGProxy(context);

  await ssg.candidate.getCurrent.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default function Dashboard() {
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
