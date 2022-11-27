import { PlacementRequestStatus, Position } from "@prisma/client";
import { ScrollArea, Table } from "@mantine/core";
import { DefaultRow } from "@features/placementRequest/board/components/DefaultRow";
import { ApprovalRow } from "@features/placementRequest/board/components/ApprovalRow";
import { DeleteRow } from "@features/placementRequest/board/components/DeleteRow";

interface PlacementRequestTableProps<T> {
  placementRequests: T[];
  view: "withDelete" | "needsApproval" | "default";
  for_: "university" | "calling-entity" | "district";
}

export function PlacementRequestTable<
  T extends {
    position: Position;
    status: PlacementRequestStatus;
    id: string;
    createdAt: Date;
  }
>({ placementRequests, view, for_ }: PlacementRequestTableProps<T>) {
  return (
    <>
      <ScrollArea>
        <Table withColumnBorders highlightOnHover fontSize={"md"}>
          <thead>
            {view === "withDelete" && (
              <tr>
                <th></th>
                <th>Created At</th>
                <th>Position</th>
                <th>Status</th>
              </tr>
            )}
            {view === "needsApproval" && (
              <tr>
                <th>Approval</th>
                <th>Created At</th>
                <th>Position</th>
              </tr>
            )}
            {view === "default" && (
              <tr>
                <th>Created At</th>
                <th>Position</th>
                <th>Status</th>
              </tr>
            )}
          </thead>
          <tbody>
            {placementRequests.map((placementRequest) => {
              switch (view) {
                case "default":
                  return (
                    <DefaultRow
                      placementRequest={placementRequest}
                      for_={for_}
                      key={placementRequest.id}
                    />
                  );
                case "needsApproval":
                  return (
                    <ApprovalRow
                      placementRequest={placementRequest}
                      for_={for_}
                      key={placementRequest.id}
                    />
                  );

                case "withDelete":
                  return (
                    <DeleteRow
                      placementRequest={placementRequest}
                      for_={for_}
                      key={placementRequest.id}
                    />
                  );
              }
            })}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
