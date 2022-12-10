import type { GetServerSideProps } from "next";
import { createStyles, Loader, Title } from "@mantine/core";
import { CandidateLayout } from "@layouts/authed/CandidateLayout";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";
import { guarded } from "@server/guarded";
import { assertCandidateDoesExist } from "@server/guards/candidate-does-exist";

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

export const getServerSideProps: GetServerSideProps = guarded(
  [assertCandidateDoesExist],
  async ({ ssg }) => ({
    props: {
      trpcState: ssg.dehydrate(),
    },
  })
);

export default function Dashboard() {
  useSession({ required: true });
  const { classes } = useStyles();
  const { data: candidate } = trpc.candidate.getCurrent.useQuery();

  if (!candidate)
    return (
      <CandidateLayout title="Dashboard">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CandidateLayout>
    );

  return (
    <CandidateLayout image={candidate.user.image ?? ""} title="Dashboard">
      <main className={classes.dashboard}>
        <Title order={1}>Dashboard</Title>
        <Title order={5}>Welcome {candidate.user.name}!</Title>
      </main>
    </CandidateLayout>
  );
}
