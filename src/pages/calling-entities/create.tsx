import type { GetServerSideProps } from "next";
import { Button, createStyles, Title } from "@mantine/core";
import { CandidateCreationLayout } from "@layouts/CandidateCreationLayout";
import {
  creationFormValidator,
  NameInput,
  useCreationForm,
  VariantSelect,
} from "@features/calling-entity-creation";
import { Variant } from "@enums/variant";
import { useDistricts } from "@hooks/useDistricts";
import { createTRPCSSGProxy, trpc } from "@services/trpc";
import { useNotify } from "@hooks/useNotify";
import { DistrictSelect } from "@form/DistrictSelect";
import { useRouter } from "next/router";
import { zodResolver } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: "90vw",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.fn.largerThan("lg")]: {
      width: "60vw",
    },
  },

  submitBtn: {
    width: "100%",
  },
}));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = await createTRPCSSGProxy(context);

  if (await ssg.callingEntity.getCurrent.fetch()) {
    return {
      redirect: {
        destination: "/calling-entities/dashboard",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default function Create() {
  const { classes } = useStyles();
  const router = useRouter();
  const { districts } = useDistricts();
  const { mutateAsync: create } = trpc.callingEntity.createOne.useMutation();
  const notify = useNotify({
    loading: "Calling Entity is being added...",
    success: "Calling Entity successfully added",
    failure: "Something went wrong...",
  });
  const form = useCreationForm({
    initialValues: {
      name: "",
      districtId: -1,
      variant: Variant.ElementarySchool,
    },
    validate: zodResolver(creationFormValidator),
  });

  return (
    <CandidateCreationLayout title="Calling Entity Creation">
      <main className={classes.layout}>
        <Title order={1}>Calling Entity Creation</Title>
        <form
          onSubmit={form.onSubmit((values) =>
            notify(create({ ...values })).then(() =>
              router.push("/calling-entities/dashboard")
            )
          )}
        >
          <NameInput form={form} />
          <VariantSelect form={form} />
          <DistrictSelect
            data={districts ?? []}
            value={form.values.districtId.toString()}
            onChange={(v) => form.setFieldValue("districtId", Number(v))}
          />
          <Button
            className={classes.submitBtn}
            mt={"md"}
            variant="gradient"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </main>
    </CandidateCreationLayout>
  );
}
