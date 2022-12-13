import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { guarded } from "@server/guarded";
import {
  Button,
  createStyles,
  Loader,
  ScrollArea,
  Title,
  Text,
} from "@mantine/core";
import { assertCandidateDoesExist } from "@server/guards/candidate-does-exist";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";
import { CandidateLayout } from "@layouts/authed/CandidateLayout";
import {
  SearchFilters,
  SearchResultsTable,
  searchValidator,
  useSearchForm,
  useSearchParams,
} from "@features/placement-request-search";
import { zodResolver } from "@mantine/form";
import { useDistricts } from "@hooks/useDistricts";
import { useRouter } from "next/router";
import { useNotify } from "@hooks/useNotify";
import { openConfirmModal } from "@mantine/modals";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },

  display: {
    width: "80vw",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.fn.largerThan("lg")]: {
      width: "70vw",
    },
  },

  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filters: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1em",

    [theme.fn.largerThan("lg")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
}));

export const getServerSideProps: GetServerSideProps = guarded(
  [assertCandidateDoesExist],
  async ({ ssg }) => {
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
    };
  }
);

const confirmModal = (onConfirm: () => void) => {
  openConfirmModal({
    title: "Begin Call?",
    children: (
      <Text>Do you want to begin a call with this Calling Entity?</Text>
    ),
    labels: { confirm: "Yes", cancel: "No" },
    onConfirm,
  });
};
export default function CandidatesPlacementRequestsIndex(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  useSession({ required: true });
  const { classes } = useStyles();
  const { data: candidate } = trpc.candidate.getCurrent.useQuery();
  const {
    data: requests,
    isLoading,
    refetch,
  } = trpc.candidate.getAllPlacementRequests.useQuery();
  const form = useSearchForm({
    validate: zodResolver(searchValidator),
  });
  const { districts } = useDistricts();
  const { mutateAsync: beginCall } = trpc.candidate.createCall.useMutation();
  const notify = useNotify({
    loading: "Your interest is being expressed...",
    success: "Your interest has been recorded, check back in later!",
    failure: "Something went wrong",
  });
  const router = useRouter();
  const getResults = useSearchParams({ form, requests: requests ?? [] });

  if (isLoading)
    return (
      <CandidateLayout title="Candidate - Placement Requests">
        <main className={classes.loader}>
          <Loader />
        </main>
      </CandidateLayout>
    );

  if (!candidate || !requests)
    return (
      <CandidateLayout title="Candidate - Error">
        <main className={classes.loader}>
          <Title order={1}>
            Uh Oh. <br /> Something went wrong.
          </Title>
        </main>
      </CandidateLayout>
    );

  return (
    <CandidateLayout
      image={candidate.user.image ?? ""}
      title="Candidate - Placement Requests"
    >
      <main className={classes.display}>
        <section className={classes.title}>
          <Title order={1}>Placement Requests</Title>
          <Button onClick={() => form.reset()}>Clear</Button>
        </section>
        <section className={classes.filters}>
          <SearchFilters form={form} districts={districts ?? []} />
        </section>
        <ScrollArea>
          <SearchResultsTable
            requests={getResults()}
            onRowClick={(requestId) =>
              router.push(`/candidates/placement-requests/${requestId}`)
            }
            onCallClick={(requestId) =>
              confirmModal(() =>
                notify(beginCall({ requestId })).then(() => refetch())
              )
            }
          />
        </ScrollArea>
      </main>
    </CandidateLayout>
  );
}
