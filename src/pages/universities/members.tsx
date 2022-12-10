import type { GetServerSideProps } from "next";
import { Button, createStyles, Loader, Title } from "@mantine/core";
import { trpc } from "@services/trpc";
import { useSession } from "next-auth/react";
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
import { zodResolver } from "@mantine/form";
import { guarded } from "@server/guarded";
import { assertMemberOfUniversity } from "@server/guards/member-of-university";
import { UniversityLayout } from "@layouts/authed/UniversityLayout";

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
  [assertMemberOfUniversity],
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
  const { data: university } = trpc.university.getCurrent.useQuery();
  const { mutateAsync: add } = trpc.university.addMember.useMutation();
  const { mutateAsync: remove } = trpc.university.deleteMember.useMutation();
  const { mutateAsync: update } =
    trpc.university.updateMemberRole.useMutation();
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

  if (!university || !session)
    return (
      <UniversityLayout title="University Members">
        <main className={classes.loader}>
          <Loader variant="bars" size={"xl"} />
        </main>
      </UniversityLayout>
    );

  return (
    <UniversityLayout
      title={`${university.name} Members List`}
      image={session.user?.image ?? ""}
    >
      <Title order={1}>Members of the {university.name} District</Title>
      <form
        className={classes.addForm}
        onSubmit={form.onSubmit((values) =>
          newMemberNotify(add({ ...values, universityId: university.id }))
        )}
      >
        <NewMemberInput form={form} />
        <Button variant="gradient" type="submit">
          Add
        </Button>
      </form>
      <main>
        <MembershipTable
          members={university.members}
          onMemberDelete={(userId) => deleteMemberNotify(remove({ userId }))}
          onMemberRoleUpdate={(userId, role) =>
            updateMemberNotify(update({ userId, role }))
          }
        />
      </main>
    </UniversityLayout>
  );
}
