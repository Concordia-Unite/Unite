import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Button, createStyles, Loader, Title } from "@mantine/core";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/trpc/router/_app";
import { createContextInner } from "src/server/trpc/context";
import { getServerAuthSession } from "@server/get-server-auth-session";
import { trpc } from "@services/trpc";
import { useNotify } from "@hooks/useNotify";
import { useSession } from "next-auth/react";
import { CallingEntityDashboardLayout } from "@layouts/CallingEntityDashboardLayout";
import {
  MembershipTable,
  NewMemberInput,
  useCreationForm,
} from "@features/calling-entities-membership";

const useStyles = createStyles((theme) => ({
  loader: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },
  dashboard: {
    height: "100%",
    width: "100%",
    [theme.fn.largerThan("lg")]: {
      width: "60wv",
    },
  },

  addForm: {
    display: "flex",
    width: "80vw",
    marginRight: "auto",
    marginLeft: "auto",
    justifyContent: "center",
  },
}));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session: await getServerAuthSession(context),
    }),
  });

  try {
    if (!(await ssg.callingEntity.getCurrent.fetch())) {
      return {
        redirect: {
          destination: "/calling-entities/create",
        },
        props: {},
      };
    }
  } catch {
    return {
      redirect: {
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

export default function Members() {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const { data: entity } = trpc.callingEntity.getCurrent.useQuery();
  const { mutateAsync: addMember } = trpc.callingEntity.addMember.useMutation();
  const { mutateAsync: deleteMember } =
    trpc.callingEntity.deleteMember.useMutation();
  const { mutateAsync: updateMember } =
    trpc.callingEntity.updateMemberRole.useMutation();
  const newMemberNotify = useNotify({
    loading: "Adding Member now...",
    success: "Member successfully added!",
    failure: "Something went wrong",
  });
  const updateMemberNotify = useNotify({
    loading: "Updated Member now...",
    success: "Member successfully updated!",
    failure: "Something went wrong",
  });
  const deleteMemberNotify = useNotify({
    loading: "Deleting Member now...",
    success: "Member successfully deleted!",
    failure: "Something went wrong",
  });
  const form = useCreationForm();

  if (!entity || !session)
    return (
      <CallingEntityDashboardLayout title="Calling Entity Members">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CallingEntityDashboardLayout>
    );

  return (
    <CallingEntityDashboardLayout
      title={`${entity.name} Members List`}
      image={session.user?.image ?? ""}
    >
      <Title order={1}>Members of {entity.name}</Title>
      <form
        className={classes.addForm}
        onSubmit={form.onSubmit((values) =>
          newMemberNotify(addMember({ ...values, callingEntityId: entity.id }))
        )}
      >
        <NewMemberInput form={form} />
        <Button variant="gradient" type="submit">
          Add
        </Button>
      </form>
      <main>
        <MembershipTable
          members={entity.members}
          onMemberDelete={(userId) =>
            deleteMemberNotify(deleteMember({ userId }))
          }
          onMemberRoleUpdate={(userId, role) =>
            updateMemberNotify(updateMember({ userId, role }))
          }
        />
      </main>
    </CallingEntityDashboardLayout>
  );
}
