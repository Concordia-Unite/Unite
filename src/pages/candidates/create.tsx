import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Button, createStyles, Title } from "@mantine/core";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContextInner } from "src/server/trpc/context";
import { getServerAuthSession } from "@server/get-server-auth-session";
import superjson from "superjson";
import { CandidateCreationLayout } from "@layouts/CandidateCreationLayout";
import { trpc } from "@services/trpc";
import {
  PersonalInfoInput,
  useSessionPreFilledForm,
} from "@features/candidate-creation";
import { DistrictSelect } from "@form/DistrictSelect";
import { UniversitySelect } from "@form/UniversitySelect";
import { useNotify } from "@hooks/useNotify";
import { useDistricts } from "@hooks/useDistricts";
import { useUniversities } from "@hooks/useUniversities";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
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
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session: await getServerAuthSession(context),
    }),
    transformer: superjson,
  });

  Promise.all([
    ssg.district.getAll.prefetch(),
    ssg.university.getAll.prefetch(),
  ]);

  if (await ssg.candidate.getCurrent.fetch()) {
    return {
      redirect: {
        destination: "/candidates/me",
      },
      props: {},
    };
  } else {
    return {
      props: ssg.dehydrate(),
    };
  }
};

export default function CandidateCreate() {
  // _: InferGetServerSidePropsType<typeof getServerSideProps>
  const { classes } = useStyles();
  const router = useRouter();
  const { mutateAsync: create } = trpc.candidate.createNew.useMutation();
  const { districts } = useDistricts();
  const { universities } = useUniversities();

  const notify = useNotify({
    loading: "Candidate is being added...",
    success: "Canddiate was successfully added!",
    failure: "Something went Wrong...",
  });

  const form = useSessionPreFilledForm();

  return (
    <CandidateCreationLayout title="Candidate Creation">
      <main className={classes.layout}>
        <Title order={1}>Create Your Candidate Profile</Title>
        <form
          onSubmit={form.onSubmit((values) =>
            notify(create({ ...values })).then(() =>
              router.push("/candidates/me")
            )
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
            mt={"md"}
            type="submit"
            variant={"gradient"}
          >
            Submit
          </Button>
        </form>
      </main>
    </CandidateCreationLayout>
  );
}
