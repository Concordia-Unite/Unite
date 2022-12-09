import type { GetServerSideProps } from "next";
import { Button, createStyles, Loader, Title, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { createTRPCSSGProxy, trpc } from "@services/trpc";
import { CandidateDashboardLayout } from "@layouts/CandidateDashboardLayout";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = await createTRPCSSGProxy(context);

  await ssg.candidate.getCurrent.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

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
      <CandidateDashboardLayout title="Settings">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CandidateDashboardLayout>
    );

  return (
    <CandidateDashboardLayout
      title="Settings"
      image={candidate.user.image ?? ""}
    >
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
    </CandidateDashboardLayout>
  );
}
