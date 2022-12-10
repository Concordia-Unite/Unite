import type { GetServerSideProps } from "next";
import { Button, createStyles, Loader, Title } from "@mantine/core";
import { CallingEntityLayout } from "@layouts/authed/CallingEntityLayout";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";
import {
  AdvancedInput,
  BasicInput,
  useCreationForm,
  creationFormValidator,
} from "@features/placement-request-creation";
import { useUniversities } from "@hooks/useUniversities";
import { Position } from "@enums/position";
import { HousingAllowanceVariant } from "@enums/housing-allowance-variant";
import { SocialSecurityContribution } from "@enums/social-security-contribution";
import { useNotify } from "@hooks/useNotify";
import { assertHasCallingEntity } from "@server/guards/has-calling-entity";
import { zodResolver } from "@mantine/form";
import { guarded } from "@server/guarded";

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
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.fn.largerThan("lg")]: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-evenly",
    },
  },

  submitBtn: {
    width: "100%",
  },

  formSection: {
    display: "flex",
    flexDirection: "column",
    [theme.fn.largerThan("lg")]: {
      "&:first-of-type": {
        marginRight: "1em",
      },
    },
    [theme.fn.smallerThan("lg")]: {
      "&:last-of-type": {
        marginTop: "1em",
      },
    },
  },

  hr: {
    display: "hidden",
    [theme.fn.smallerThan("lg")]: {
      display: "block",
      width: "100%",
    },
  },
}));

export const getServerSideProps: GetServerSideProps = guarded(
  [assertHasCallingEntity],
  async ({ ssg }) => ({
    props: {
      trpcState: ssg.dehydrate(),
    },
  })
);

export default function CallingEntitiesPlacementRequestsCreate() {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const { data: entity } = trpc.callingEntity.getCurrent.useQuery();
  const { mutateAsync: create } =
    trpc.callingEntity.createPlacementRequest.useMutation();
  const { universities } = useUniversities();
  const notify = useNotify({
    loading: "Placement Request is being created",
    success: "Placement Reqeust was successfully added!",
    failure: "Something went wrong...",
  });
  const form = useCreationForm({
    initialValues: {
      position: Position.DCE,
      grades: [],
      description: "",
      subject: "",
      callingEntityId: -1,
      housingAllowance: {
        type: HousingAllowanceVariant.Provided,
      },
      isFullTime: false,
      isTenured: false,
      socialSecurityContribution: SocialSecurityContribution.EmployerPaysAll,
      universities: [],
      salary: 0,
      startDate: null,
    },
    validate: zodResolver(creationFormValidator),
  });

  if (!entity || !session)
    return (
      <CallingEntityLayout title="Calling Entity Placement Request">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CallingEntityLayout>
    );

  return (
    <CallingEntityLayout
      title="Calling Entity Placement Request"
      image={session.user?.image ?? ""}
    >
      <main className={classes.layout}>
        <Title order={1}>Create a Placement Request</Title>
        <form
          onSubmit={form.onSubmit((values) =>
            notify(
              create({
                ...values,
                callingEntityId: entity.id,
                districtId: entity.districtId,
                universityIds: values.universities,
              })
            )
          )}
        >
          <section className={classes.form}>
            <section className={classes.formSection}>
              <Title order={5}>Basic Information</Title>
              <BasicInput form={form} />
            </section>
            <section className={classes.formSection}>
              <hr className={classes.hr} />
              <Title order={5}>Advanced Information</Title>
              <AdvancedInput form={form} universities={universities ?? []} />
            </section>
          </section>
          <Button
            className={classes.submitBtn}
            mt={"md"}
            variant="gradient"
            type="submit"
          >
            Create
          </Button>
        </form>
      </main>
    </CallingEntityLayout>
  );
}
