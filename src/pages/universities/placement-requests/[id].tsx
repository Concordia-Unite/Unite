import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { guarded } from "@server/guarded";
import { Button, createStyles, Loader, Title, Text } from "@mantine/core";
import { assertMemberOfUniversity } from "@server/guards/member-of-university";
import { useRouter } from "next/router";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";
import { UniversityLayout } from "@layouts/authed/UniversityLayout";
import { PlacementRequestDetail } from "@features/placement-request-detail";
import { LinkButton } from "@ui/LinkButton";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons";
import { useNotify } from "@hooks/useNotify";
import { openConfirmModal } from "@mantine/modals";
import { PlacementRequestStatus } from "@enums/placement-request-status";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },

  main: {
    width: "80vw",
    marginRight: "auto",
    marginLeft: "auto",

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
  [assertMemberOfUniversity],
  async ({ ssg, ctx }) => {
    await ssg.placementRequest.getById.prefetch({
      id: Number(ctx.query["id"]),
    });
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
    };
  }
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
export default function UniversitiesPlacementRequestsId(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const router = useRouter();
  const id = Number(router.query["id"]);
  const { data: request, isLoading } = trpc.placementRequest.getById.useQuery({
    id,
  });
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
  const { mutateAsync: update } =
    trpc.university.updateRequestStatus.useMutation();

  if (isLoading || !session)
    return (
      <UniversityLayout title="University Placement Requests">
        <main className={classes.loader}>
          <Loader />
        </main>
      </UniversityLayout>
    );

  if (!request)
    return (
      <UniversityLayout title="University Placement Requests">
        <main className={classes.loader}>
          <Title order={1} align="center">
            Uh Oh. <br /> There is no Request with this id.
          </Title>
        </main>
      </UniversityLayout>
    );

  return (
    <UniversityLayout
      image={session.user?.image ?? ""}
      title={`University - ${request.positionPosition}`}
    >
      <main className={classes.main}>
        <section className={classes.btnLayout}>
          <LinkButton
            href="/universities/placement-requests"
            leftIcon={<IconArrowLeft />}
          >
            Back
          </LinkButton>
          <section>
            <Button
              className={classes.approveBtn}
              leftIcon={<IconCheck />}
              onClick={() =>
                approvalModal(id, () =>
                  approveNotify(
                    update({
                      status: PlacementRequestStatus.Approved,
                      requestId: id,
                    })
                  ).then(() => router.push("/universities/placement-requests"))
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
                      status: PlacementRequestStatus.Denied,
                      requestId: id,
                    })
                  ).then(() => router.push("/universities/placement-requests"))
                )
              }
            >
              Deny
            </Button>
          </section>
        </section>
        <PlacementRequestDetail placementRequest={request} />
      </main>
    </UniversityLayout>
  );
}
