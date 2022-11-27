import type { PlacementRequestStatus, Position } from "@prisma/client";
import { useRouter } from "next/router";

interface DefaultRowProps<T> {
  placementRequest: T;
  for_: "university" | "calling-entity" | "district";
}

export function DefaultRow<
  T extends {
    position: Position;
    createdAt: Date;
    id: string;
    status: PlacementRequestStatus;
  }
>({ placementRequest, for_ }: DefaultRowProps<T>) {
  const router = useRouter();
  return (
    <>
      <tr
        onClick={() =>
          router.push(`/${for_}/placementRequests/${placementRequest.id}`)
        }
      >
        <td>{placementRequest.createdAt.toLocaleDateString()}</td>
        <td>{placementRequest.position.replaceAll("_", " ")}</td>
        <td>{placementRequest.status.replaceAll("_", " ")}</td>
      </tr>
    </>
  );
}
