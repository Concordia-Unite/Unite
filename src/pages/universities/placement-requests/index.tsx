import type { GetServerSideProps } from "next";
import { guarded } from "@server/guarded";
import { createStyles, Loader, Title, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "@services/trpc";
import { RequestTable } from "@features/placement-approval";
import { openConfirmModal } from "@mantine/modals";
import { useNotify } from "@hooks/useNotify";
import { PlacementRequestStatus } from "@enums/placement-request-status";
import { assertMemberOfUniversity } from "@server/guards/member-of-university";
import { UniversityLayout } from "@layouts/authed/UniversityLayout";
import { useRouter } from "next/router";

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
  [assertMemberOfUniversity],
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
  const router = useRouter();
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
  const { data: university, refetch } = trpc.university.getCurrent.useQuery();
  const { mutateAsync: update } =
    trpc.university.updateRequestStatus.useMutation();

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
      <Title order={1}>Placement Requests</Title>
      <RequestTable
        onRowClick={(id) =>
          router.push(`/universities/placement-requests/${id}`)
        }
        placementRequests={university.requests.filter(
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
    </UniversityLayout>
  );
}
