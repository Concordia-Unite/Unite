/**
 * MembershipRow.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * Display for a single Member in a MembershipTable.
 */

// Imports
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
import type {
  CallingEntityMembership,
  DistrictMembership,
  UniversityMembership,
  User,
} from "@prisma/client";

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
  member: (
    | CallingEntityMembership
    | DistrictMembership
    | UniversityMembership
  ) & {
    user: User;
  };
  onRoleUpdate: (userId: string, role: Role) => void;
  onMemberDelete: (userId: string) => void;
}

/**
 * Modal for confirming the updating of a member's role.
 * @param name The name of the Member
 * @param role The role to update the member to
 * @param userId the Id of the user
 * @param onConfirm What to do on confirm
 */
const updateModal = (
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
    labels: { confirm: "Update", cancel: "Cancel" },
    onConfirm: () => onConfirm(userId, role as Role),
  });
};

/**
 * Modal for confirming the deletion of a member.
 * @param name The name of the Member
 * @param userId the Id of the user
 * @param onConfirm What to do on confirm
 */
const deleteModal = (
  name: string,
  userId: string,
  onConfirm: Props["onMemberDelete"]
) => {
  openConfirmModal({
    title: `Delete ${name}?`,
    children: <Text>Delete {name}? There is no going back.</Text>,
    labels: { confirm: "Delete", cancel: "Cancel" },
    onConfirm: () => onConfirm(userId),
  });
};

/**
 * ### MembershipRow
 *
 * Displays a member with a dropdown to change the role, and a delete button.
 */
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
              ? updateModal(
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
            deleteModal(
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
