import { Role } from "@enums/role";
import {
  Avatar,
  CloseButton,
  createStyles,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import type { CallingEntityMembership, User } from "@prisma/client";

const useStyles = createStyles((theme) => ({
  nameCard: {
    display: "inline-flex",
  },

  contactInfo: {
    display: "flex",
    flexDirection: "column",
  },

  deleteBtn: {
    color: theme.colors.red[5],
    borderColor: theme.colors.red[5],

    "&:hover": {
      backgroundColor: theme.colors.red[5],
      color: theme.white,
    },
  },

  rowHover: {
    "&:hover": {
      backgroundColor: theme.colors.gray[3],
    },
  },
}));

interface Props {
  member: CallingEntityMembership & {
    user: User;
  };
  callingEntityId: number;
  onRoleUpdate: (userId: string, role: Role) => void;
  onMemberDelete: (userId: string) => void;
}

const updateConfirmModel = (
  name: string,
  role: string,
  userId: string,
  onConfirm: Props["onRoleUpdate"]
) => {
  openConfirmModal({
    title: `Update ${name}'s Role?`,
    children: (
      <Text>
        Update {name} with role {role}?
      </Text>
    ),
    onConfirm: () => onConfirm(userId, role as Role),
  });
};

const deleteConfirmModal = (
  name: string,
  userId: string,
  onConfirm: Props["onMemberDelete"]
) => {
  openConfirmModal({
    title: `Delete ${name}?`,
    children: <Text>Delete {name}? There is no going back.</Text>,
    onConfirm: () => onConfirm(userId),
  });
};

export function MembershipRow(props: Props) {
  const { classes } = useStyles();
  return (
    <tr key={props.member.id} className={classes.rowHover}>
      <td className={classes.nameCard}>
        <Avatar mr={"xs"} src={props.member.user.image} radius={"md"} />
        <div className={classes.contactInfo}>
          <Title order={6}>{props.member.user.name}</Title>
          <Text color={"dimmed"}>{props.member.user.email}</Text>
        </div>
      </td>
      <td>
        <Select
          data={Object.values(Role)}
          defaultValue={props.member.role}
          // variant={"unstyled"}
          disabled={props.member.role === Role.Member.valueOf()}
          onChange={(e) =>
            e
              ? updateConfirmModel(
                  props.member.user.name ?? "Person",
                  e,
                  props.member.user.id,
                  props.onRoleUpdate
                )
              : null
          }
        />
      </td>
      <td>
        <CloseButton
          className={classes.deleteBtn}
          variant="outline"
          onClick={() =>
            deleteConfirmModal(
              props.member.user.name ?? "Person",
              props.member.user.id,
              props.onMemberDelete
            )
          }
        />
      </td>
    </tr>
  );
}
