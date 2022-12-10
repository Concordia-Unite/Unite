import type { GetServerSideProps } from "next";
import { Button, createStyles, Loader, Title, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { trpc } from "@services/trpc";
import { CandidateLayout } from "@layouts/authed/CandidateLayout";
import {
  PersonalInfoInput,
  usePreFilledUpdateForm,
} from "@features/candidate-settings";
import { useNotify } from "@hooks/useNotify";
import { DistrictSelect } from "@form/DistrictSelect";
import { UniversitySelect } from "@form/UniversitySelect";
import { useDistricts } from "@hooks/useDistricts";
import { useUniversities } from "@hooks/useUniversities";
import { openConfirmModal } from "@mantine/modals";
import { guarded } from "@server/guarded";
import { assertCandidateDoesExist } from "@server/guards/candidate-does-exist";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",

    maxWidth: "80vw",

    [theme.fn.largerThan("lg")]: {
      maxWidth: "60vw",
    },
  },

  submitBtn: {
    width: "100%",
  },
}));

export const getServerSideProps: GetServerSideProps = guarded(
  [assertCandidateDoesExist],
  async ({ ssg }) => ({
    props: {
      trpcState: ssg.dehydrate(),
    },
  })
);

const confirmModal = (onConfirm: () => void) =>
  openConfirmModal({
    title: "Update Settings?",
    children: <Text>Are you sure you want to update?</Text>,
    labels: { confirm: "Update", cancel: "Cancel" },
    onConfirm,
  });

export default function Settings() {
  useSession({ required: true });
  const { classes } = useStyles();
  const { data: candidate } = trpc.candidate.getCurrent.useQuery();
  const { districts } = useDistricts();
  const { universities } = useUniversities();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const form = usePreFilledUpdateForm({ candidate: candidate! });
  const { mutateAsync: update } = trpc.candidate.update.useMutation();
  const notify = useNotify({
    loading: "Your profile is being updated...",
    success: "Profile Successfully Updated",
    failure: "Something went wrong...",
  });

  if (!candidate)
    return (
      <CandidateLayout title="Settings">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CandidateLayout>
    );

  return (
    <CandidateLayout title="Settings" image={candidate.user.image ?? ""}>
      <main className={classes.layout}>
        <Title order={1}>Settings</Title>
        <form
          onSubmit={form.onSubmit((values) =>
            confirmModal(() => notify(update({ ...values })))
          )}
        >
          <PersonalInfoInput form={form} />
          {form.values.wasRostered ? (
            <DistrictSelect
              required
              data={districts ?? []}
              value={form.values.districtId.toString()}
              onChange={(v) => form.setFieldValue("districtId", Number(v))}
            />
          ) : (
            <UniversitySelect
              required
              data={universities ?? []}
              value={form.values.universityId.toString()}
              onChange={(v) => form.setFieldValue("universityId", Number(v))}
            />
          )}
          <Button
            className={classes.submitBtn}
            variant="gradient"
            mt={"md"}
            type="submit"
          >
            Update
          </Button>
        </form>
      </main>
    </CandidateLayout>
  );
}
