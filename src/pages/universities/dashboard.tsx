import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { guarded } from "@server/guarded";
import { createStyles, Loader, Title } from "@mantine/core";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";
import { assertMemberOfUniversity } from "@server/guards/member-of-university";
import { UniversityLayout } from "@layouts/authed/UniversityLayout";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },
}));

export const getServerSideProps: GetServerSideProps = guarded(
  [assertMemberOfUniversity],
  async ({ ssg }) => ({
    props: {
      trpcState: ssg.dehydrate(),
    },
  })
);

export default function UniversitiesDashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const { data: university } = trpc.university.getCurrent.useQuery();

  if (!university || !session)
    return (
      <UniversityLayout title="University Dashboard">
        <main className={classes.loader}>
          <Loader />
        </main>
      </UniversityLayout>
    );

  return (
    <UniversityLayout
      title={`${university.name} Dashboard`}
      image={session.user?.image ?? ""}
    >
      <Title order={1}>Dashboard</Title>
      <Title order={5}>For {university.name}</Title>
    </UniversityLayout>
  );
}
