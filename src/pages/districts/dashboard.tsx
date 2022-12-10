import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { guarded } from "@server/guarded";
import { createStyles, Loader, Title } from "@mantine/core";
import { assertMemberOfDistrict } from "@server/guards/member-of-district";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";
import { DistrictLayout } from "@layouts/authed/DistrictLayout";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },
}));

export const getServerSideProps: GetServerSideProps = guarded(
  [assertMemberOfDistrict],
  async ({ ssg }) => ({
    props: {
      trpcState: ssg.dehydrate(),
    },
  })
);

export default function DistrictsDashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const { data: district } = trpc.district.getCurrent.useQuery();

  if (!district || !session)
    return (
      <DistrictLayout title="District Dashboard">
        <main className={classes.loader}>
          <Loader />
        </main>
      </DistrictLayout>
    );

  return (
    <DistrictLayout
      title={`${district.name} District Dashboard`}
      image={session.user?.image ?? ""}
    >
      <Title order={1}>Dashboard</Title>
      <Title order={5}>For {district.name} District</Title>
    </DistrictLayout>
  );
}
