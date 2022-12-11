import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { guarded } from "@server/guarded";
import { Button, createStyles, Loader, ScrollArea, Title } from "@mantine/core";
import { assertApprovedForCandidate } from "@server/guards/approved-for-candidate";
import { assertCandidateDoesExist } from "@server/guards/candidate-does-exist";
import { trpc } from "@services/trpc";
import { useRouter } from "next/router";
import { CandidateLayout } from "@layouts/authed/CandidateLayout";
import { PlacementRequestDetail } from "@features/placement-request-detail";
import { LinkButton } from "@ui/LinkButton";
import { IconArrowLeft, IconChecklist } from "@tabler/icons";

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
    justifyContent: "center",
    alignItems: "flex-end",
  },

  maxWidthBtn: {
    marginLeft: "1em",
    width: "100%",
  },
}));

export const getServerSideProps: GetServerSideProps = guarded(
  [assertCandidateDoesExist, assertApprovedForCandidate],
  async ({ ssg }) => ({
    props: {
      trpcState: ssg.dehydrate(),
    },
  })
);

export default function CandidatesPlacementRequestsId(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { classes } = useStyles();
  const router = useRouter();
  const id = Number(router.query["id"]);
  const { data: candidate } = trpc.candidate.getCurrent.useQuery();
  const { data: request, isLoading } = trpc.placementRequest.getById.useQuery({
    id,
  });

  if (isLoading || !candidate)
    return (
      <CandidateLayout title="Candidate Placement Requests">
        <main className={classes.loader}>
          <Loader />
        </main>
      </CandidateLayout>
    );

  if (!request)
    return (
      <CandidateLayout
        title="Candidate Placement Request Error"
        image={candidate.user.image ?? ""}
      >
        <main className={classes.loader}>
          <Title order={1}>
            Uh Oh. <br /> There's nothing here for you
          </Title>
        </main>
      </CandidateLayout>
    );

  return (
    <CandidateLayout
      title="Candidate - Request Detail"
      image={candidate.user.image ?? ""}
    >
      <main className={classes.main}>
        <ScrollArea h={"70vh"}>
          <PlacementRequestDetail placementRequest={request} />
        </ScrollArea>
        <hr />
        <section className={classes.btnLayout}>
          <LinkButton
            href="/candidates/placement-requests"
            leftIcon={<IconArrowLeft />}
          >
            Back
          </LinkButton>
          <Button
            mt={"md"}
            className={classes.maxWidthBtn}
            leftIcon={<IconChecklist />}
          >
            Begin Call Process
          </Button>
        </section>
      </main>
    </CandidateLayout>
  );
}
