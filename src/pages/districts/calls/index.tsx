import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { guarded } from "@server/guarded";
import { createStyles, Loader, Skeleton, Text, Title } from "@mantine/core";
import { assertMemberOfUniversity } from "@server/guards/member-of-university";
import { openConfirmModal } from "@mantine/modals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useNotify } from "@hooks/useNotify";
import { trpc } from "@services/trpc";
import { CallTable } from "@features/call-approval";
import { CallStatus } from "@enums/call-status";
import { DistrictLayout } from "@layouts/authed/DistrictLayout";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },

  table: {
    width: "80vw",
    marginLeft: "auto",
    marginRight: "auto",
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

const approvalModal = (callId: number, onConfirm: () => void) =>
  openConfirmModal({
    title: `Approve ${callId}?`,
    children: <Text>Do you want to approve {callId}?</Text>,
    labels: { confirm: "Approve", cancel: "Cancel" },
    onConfirm,
  });

const denyModal = (callId: number, onConfirm: () => void) =>
  openConfirmModal({
    title: `Deny ${callId}?`,
    children: <Text>Do you want to approve {callId}?</Text>,
    labels: { confirm: "Deny", cancel: "Cancel" },
    onConfirm,
  });

export default function DistrictCallsIndex(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const router = useRouter();
  const denyNotify = useNotify({
    loading: "Call is being denied...",
    success: "Call successfully denied",
    failure: "Something went wrong",
  });
  const approveNotify = useNotify({
    loading: "Call is being approved...",
    success: "Call successfully approved",
    failure: "Something went wrong",
  });

  const { data: district } = trpc.district.getCurrent.useQuery();
  const {
    data: calls,
    refetch,
    isLoading,
  } = trpc.district.getAllCalls.useQuery();
  const { mutateAsync: update } = trpc.district.updateCallStatus.useMutation();

  if (!district || !session)
    return (
      <DistrictLayout title="University Dashboard">
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
      <main className={classes.table}>
        <Title order={1}>Calls</Title>
        {isLoading && <Skeleton />}
        {calls ? (
          <CallTable
            calls={calls}
            onRowClick={(callId) => router.push(`/districts/calls/${callId}`)}
            onApprove={(callId) =>
              approvalModal(callId, () =>
                approveNotify(
                  update({ callId, status: CallStatus.Pushed })
                ).then(() => refetch())
              )
            }
            onDeny={(callId) =>
              denyModal(callId, () =>
                denyNotify(update({ callId, status: CallStatus.Blocked })).then(
                  () => refetch()
                )
              )
            }
          />
        ) : (
          <Title order={2} color="dimmed">
            Uh Oh. Something went wrong
          </Title>
        )}
      </main>
    </DistrictLayout>
  );
}
