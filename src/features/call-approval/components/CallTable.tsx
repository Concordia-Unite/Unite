import { Table } from "@mantine/core";
import type { RouterOutputs } from "@services/trpc";
import { CallRow } from "./CallRow";

interface Props {
  calls: NonNullable<RouterOutputs["university"]["getAllCalls"]>;
  onApprove: (callId: number) => void;
  onDeny: (callId: number) => void;
  onRowClick: (callId: number) => void;
}

export function CallTable(props: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <td>Status</td>
          <th>Position</th>
          <th>Candidate</th>
          <th>Calling Entity</th>
          <th>Approve/Deny</th>
        </tr>
      </thead>
      <tbody>
        {props.calls.map((call) => (
          <CallRow
            key={call.id}
            call={call}
            onApprove={props.onApprove}
            onDeny={props.onDeny}
            onRowClick={props.onRowClick}
          />
        ))}
      </tbody>
    </Table>
  );
}
