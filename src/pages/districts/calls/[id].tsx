import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { guarded } from "@server/guarded";
import { Button, createStyles, Loader, Title, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "@services/trpc";
import { UniversityLayout } from "@layouts/authed/UniversityLayout";
import { CallDetail } from "@features/call-detail";
import { LinkButton } from "@ui/LinkButton";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons";
import { CallStatus } from "@enums/call-status";
import { openConfirmModal } from "@mantine/modals";
import { useNotify } from "@hooks/useNotify";
import { assertMemberOfDistrict } from "@server/guards/member-of-district";
import { assertDistrictCanViewCall } from "@server/guards/district-can-view-call";
import { DistrictLayout } from "@layouts/authed/DistrictLayout";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },

  main: {
    width: "80vw",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.fn.largerThan("lg")]: {
      width: "60vw",
    },
  },
  btnLayout: {
    display: "flex",
    justifyContent: "space-between",
  },

  approveBtn: {
    backgroundColor: theme.colors.green[8],
    marginRight: "1em",

    "&:hover": {
      backgroundColor: theme.colors.green[9],
    },
  },
  denyBtn: {
    backgroundColor: theme.colors.red[8],

    "&:hover": {
      backgroundColor: theme.colors.red[9],
    },
  },
}));

export const getServerSideProps: GetServerSideProps = guarded(
  [assertMemberOfDistrict, assertDistrictCanViewCall],
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

export default function UniversitiesCallsId(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const router = useRouter();
  const id = Number(router.query["id"]);
  const { data: call, isLoading } = trpc.call.getById.useQuery({ id });
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
  const { mutateAsync: update } = trpc.district.updateCallStatus.useMutation();

  if (isLoading || !session)
    return (
      <DistrictLayout title="District Calls">
        <main className={classes.loader}>
          <Loader />
        </main>
      </DistrictLayout>
    );

  if (!call)
    return (
      <DistrictLayout title="District Calls" image={session.user?.image ?? ""}>
        <main className={classes.loader}>
          <Title order={1} align="center">
            Uh Oh. <br /> There is no Call with this Id.
          </Title>
        </main>
      </DistrictLayout>
    );

  return (
    <DistrictLayout
      image={session.user?.image ?? ""}
      title={`District Call ${call.id}`}
    >
      <main className={classes.main}>
        <section className={classes.btnLayout}>
          <LinkButton href="/universities/calls" leftIcon={<IconArrowLeft />}>
            Back
          </LinkButton>
          {call.status === CallStatus.Expressed && (
            <section>
              <Button
                className={classes.approveBtn}
                leftIcon={<IconCheck />}
                onClick={() =>
                  approvalModal(id, () =>
                    approveNotify(
                      update({
                        status: CallStatus.Pushed,
                        callId: id,
                      })
                    ).then(() => router.push("/districts/calls"))
                  )
                }
              >
                Approve
              </Button>
              <Button
                className={classes.denyBtn}
                leftIcon={<IconX />}
                onClick={() =>
                  denyModal(id, () =>
                    denyNotify(
                      update({
                        status: CallStatus.Blocked,
                        callId: id,
                      })
                    ).then(() => router.push("/districts/calls"))
                  )
                }
              >
                Deny
              </Button>
            </section>
          )}
        </section>
        <CallDetail call={call} />
      </main>
    </DistrictLayout>
  );
}
