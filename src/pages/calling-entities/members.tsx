import type { GetServerSideProps } from "next";
import { Button, createStyles, Loader, Title } from "@mantine/core";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";
import { CallingEntityLayout } from "@layouts/authed/CallingEntityLayout";
import {
  creationFormValidator,
  MembershipTable,
  NewMemberInput,
  useCreationForm,
  useNotifyDeleteMember,
  useNotifyNewMember,
  useNotifyUpdateMember,
} from "@features/membership";
import { Role } from "@enums/role";
import { assertHasCallingEntity } from "@server/guards/has-calling-entity";
import { zodResolver } from "@mantine/form";
import { guarded } from "@server/guarded";

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

export const getServerSideProps: GetServerSideProps = guarded(
  [assertHasCallingEntity],
  async ({ ssg }) => {
    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
    };
  }
);

export default function Members() {
  const { data: session } = useSession({ required: true });
  const { classes } = useStyles();
  const { data: entity } = trpc.callingEntity.getCurrent.useQuery();
  const { mutateAsync: add } = trpc.callingEntity.addMember.useMutation();
  const { mutateAsync: remove } = trpc.callingEntity.deleteMember.useMutation();
  const { mutateAsync: update } =
    trpc.callingEntity.updateMemberRole.useMutation();
  const newMemberNotify = useNotifyNewMember();
  const deleteMemberNotify = useNotifyDeleteMember();
  const updateMemberNotify = useNotifyUpdateMember();

  const form = useCreationForm({
    initialValues: {
      role: Role.Member,
      name: "",
      email: "",
    },
    validate: zodResolver(creationFormValidator),
  });

  if (!entity || !session)
    return (
      <CallingEntityLayout title="Calling Entity Members">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </CallingEntityLayout>
    );

  return (
    <CallingEntityLayout
      title={`${entity.name} Members List`}
      image={session.user?.image ?? ""}
    >
      <Title order={1}>Members of {entity.name}</Title>
      <form
        className={classes.addForm}
        onSubmit={form.onSubmit((values) =>
          newMemberNotify(add({ ...values, callingEntityId: entity.id }))
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
          onMemberDelete={(userId) => deleteMemberNotify(remove({ userId }))}
          onMemberRoleUpdate={(userId, role) =>
            updateMemberNotify(update({ userId, role }))
          }
        />
      </main>
    </CallingEntityLayout>
  );
}
