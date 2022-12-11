import type { GetServerSideProps } from "next";
import { guarded } from "@server/guarded";
import { createStyles, Loader, Title, Text } from "@mantine/core";
import { assertMemberOfDistrict } from "@server/guards/member-of-district";
import { useSession } from "next-auth/react";
import { trpc } from "@services/trpc";
import { DistrictLayout } from "@layouts/authed/DistrictLayout";
import { RequestTable } from "@features/placement-approval";
import { openConfirmModal } from "@mantine/modals";
import { useNotify } from "@hooks/useNotify";
import { PlacementRequestStatus } from "@enums/placement-request-status";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },

  table: {
    height: "100%",
    width: "100%",
    [theme.fn.largerThan("lg")]: {
      width: "60wv",
    },
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

const approvalModal = (requestId: number, onConfirm: () => void) =>
  openConfirmModal({
    title: `Approve ${requestId}?`,
    children: <Text>Do you want to approve {requestId}?</Text>,
    labels: { confirm: "Approve", cancel: "Cancel" },
    onConfirm,
  });

const denyModal = (requestId: number, onConfirm: () => void) =>
  openConfirmModal({
    title: `Deny ${requestId}?`,
    children: <Text>Do you want to approve {requestId}?</Text>,
    labels: { confirm: "Deny", cancel: "Cancel" },
    onConfirm,
  });

export default function DistrictsPlacementRequests() {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const denyNotify = useNotify({
    loading: "Request is being denied...",
    success: "Request successfully denied",
    failure: "Something went wrong",
  });
  const approveNotify = useNotify({
    loading: "Request is being approved...",
    success: "Request successfully approved",
    failure: "Something went wrong",
  });
  const { data: district, refetch } = trpc.district.getCurrent.useQuery();
  const { mutateAsync: update } =
    trpc.district.updateRequestStatus.useMutation();

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
      <Title order={1}>Placement Requests</Title>
      <RequestTable
        onRowClick={() => {
          return;
        }}
        placementRequests={district.requests.filter(
          (request) =>
            request.status === PlacementRequestStatus.Pending.valueOf()
        )}
        onApprove={(id) => {
          approvalModal(id, () =>
            approveNotify(
              update({ requestId: id, status: PlacementRequestStatus.Approved })
            ).then(() => refetch())
          );
        }}
        onDenied={(id) => {
          denyModal(id, () =>
            denyNotify(
              update({ requestId: id, status: PlacementRequestStatus.Denied })
            ).then(() => refetch())
          );
        }}
      />
    </DistrictLayout>
  );
}
