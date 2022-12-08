import type { Role } from "@enums/role";
import { createStyles, Table } from "@mantine/core";
import type { CallingEntityMembership, User } from "@prisma/client";
import { MembershipRow } from "./MembershipRow";

const useStyles = createStyles((theme) => ({
  tableLayout: {
    width: "70vw",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

interface Props {
  members: (CallingEntityMembership & {
    user: User;
  })[];
  onMemberDelete: (userId: string) => void;
  onMemberRoleUpdate: (userId: string, role: Role) => void;
}

export function MembershipTable(props: Props) {
  const { classes } = useStyles();
  return (
    <>
      <Table className={classes.tableLayout}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.members.map((member) => (
            <MembershipRow
              key={member.id}
              callingEntityId={member.callingEntityId}
              member={member}
              onMemberDelete={props.onMemberDelete}
              onRoleUpdate={props.onMemberRoleUpdate}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}
