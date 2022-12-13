import { createStyles, Table, Title } from "@mantine/core";
import type {
  CallingEntity,
  District,
  Grade,
  PlacementRequest,
} from "@prisma/client";
import { SearchResultsRow } from "./SearchResultsRow";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props {
  requests: (PlacementRequest & {
    requestee: CallingEntity & { district: District };
    grades: Grade[];
  })[];
  onCallClick: (requestId: number) => void;
  onRowClick: (requestId: number) => void;
}

export function SearchResultsTable(props: Props) {
  if (props.requests.length === 0)
    return (
      <Title mt={"lg"} align="center" order={3} color={"dimmed"}>
        No Results
      </Title>
    );
  return (
    <Table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Calling Entity</th>
          <th>Grades</th>
          <th>District</th>
          <th>Region</th>
          <th>Begin Call Process</th>
        </tr>
      </thead>
      <tbody>
        {props.requests.map((request) => (
          <SearchResultsRow
            key={request.id}
            placementRequest={request}
            onCallClick={props.onCallClick}
            onRowClick={props.onRowClick}
          />
        ))}
      </tbody>
    </Table>
  );
}
