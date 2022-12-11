/**
 * MembershipTable.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * Display of all the members in an organized table
 */

// Imports
import type {
  CallingEntityMembership,
  DistrictMembership,
  UniversityMembership,
  User,
} from "@prisma/client";
import type { Role } from "@enums/role";
import { createStyles, Table } from "@mantine/core";
import { MembershipRow } from "./MembershipRow";

const useStyles = createStyles(() => ({
  tableLayout: {
    width: "70vw",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

interface Props {
  members: ((
    | CallingEntityMembership
    | DistrictMembership
    | UniversityMembership
  ) & {
    user: User;
  })[];
  onMemberDelete: (userId: string) => void;
  onMemberRoleUpdate: (userId: string, role: Role) => void;
}

/**
 * ### MembershipTable
 *
 * This displays the members in an organized table
 */
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
