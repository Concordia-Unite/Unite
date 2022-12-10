import { createStyles, Table } from "@mantine/core";
import type {
  DistrictPlacementRequest,
  Grade,
  PlacementRequest,
  UniversityPlacementRequest,
} from "@prisma/client";
import { RequestRow } from "./RequestRow";

const useStyles = createStyles((theme) => ({
  tableLayout: {
    width: "70vw",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

interface Props {
  placementRequests: ((
    | DistrictPlacementRequest
    | UniversityPlacementRequest
  ) & {
    placementRequest: PlacementRequest & {
      requestee: {
        name: string;
      };
      grades: Grade[];
    };
  })[];
  onApprove: (placementRequestId: number) => void;
  onDenied: (placementRequestId: number) => void;
}

export function RequestTable(props: Props) {
  const { classes } = useStyles();
  return (
    <>
      <Table className={classes.tableLayout}>
        <thead>
          <tr>
            <th>Calling Entity</th>
            <th>Position</th>
            <th>Grades</th>
            <th>Approve/Deny</th>
          </tr>
        </thead>
        <tbody>
          {props.placementRequests.map((request) => (
            <RequestRow
              key={request.id}
              placementRequest={request}
              onApprove={props.onApprove}
              onDenied={props.onDenied}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}
