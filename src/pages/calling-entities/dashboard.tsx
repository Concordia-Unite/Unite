import type { GetServerSideProps } from "next";
import { createStyles, Loader, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "@services/trpc";
import { CallingEntityLayout } from "@layouts/authed/CallingEntityLayout";
import { assertHasCallingEntity } from "@server/guards/has-calling-entity";
import { guarded } from "@server/guarded";

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
  [assertHasCallingEntity],
  async ({ ssg }) => ({
    props: {
      trpcState: ssg.dehydrate(),
    },
  })
);

export default function Dashboard() {
  const { data: session } = useSession({ required: true });

  const { classes } = useStyles();
  const { data: entity } = trpc.callingEntity.getCurrent.useQuery();

  if (!entity || !session)
    return (
      <CallingEntityLayout title="Calling Entity Dashboard">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CallingEntityLayout>
    );

  return (
    <CallingEntityLayout
      image={session.user?.image ?? ""}
      title={`${entity.name} Dashboard`}
    >
      <Title order={1}>Dashboard</Title>
      <Title order={4}>For {entity.name}</Title>
    </CallingEntityLayout>
  );
}
