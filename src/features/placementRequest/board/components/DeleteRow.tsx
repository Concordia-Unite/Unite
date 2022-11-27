import { PlacementRequestStatus, Position } from "@prisma/client";
import { useHover, useId } from "@mantine/hooks";
import { useRouter } from "next/router";
import { IconX } from "@tabler/icons";
import { ActionIcon, Text } from "@mantine/core";
import { trpc } from "../../../../utils/trpc";
import { openConfirmModal } from "@mantine/modals";
import { notify } from "@lib/notification";

interface DeleteRowProps<T> {
  placementRequest: T;
  for_: "university" | "calling-entity" | "district";
}

export function DeleteRow<
  T extends {
    position: Position;
    status: PlacementRequestStatus;
    id: string;
    createdAt: Date;
  }
>({ placementRequest, for_ }: DeleteRowProps<T>) {
  const { hovered, ref } = useHover<HTMLTableDataCellElement>();
  const deleteId = useId();
  const { mutateAsync: deletePlacementRequest } =
    trpc.placementRequest.deletePlacementRequest.useMutation();
  const router = useRouter();

  function deletePlacement() {
    return openConfirmModal({
      title: "Delete Placement Request?",
      centered: true,
      children: (
        <Text>
          This request will be completely wiped. There is no recovery.
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Delete" },
      onConfirm() {
        notify(
          deleteId,
          "Placement Request Deletion",
          {
            onLoading: "Placement Request is being deleted",
            onSuccess: "Placement Request was successfully deleted",
            onFailure: "Something went wrong",
          },
          deletePlacementRequest({ id: placementRequest.id })
        );
      },
    });
  }

  return (
    <>
      <tr
        onClick={
          hovered
            ? undefined
            : () =>
                router.push(`/${for_}/placementRequests/${placementRequest.id}`)
        }
      >
        <td ref={ref}>
          <ActionIcon onClick={() => deletePlacement()}>
            <IconX color={"red"} />{" "}
          </ActionIcon>
        </td>
        <td>{placementRequest.createdAt.toLocaleDateString()}</td>
        <td>{placementRequest.position.replaceAll("_", " ")}</td>
        <td>{placementRequest.status.replaceAll("_", " ")}</td>
      </tr>
    </>
  );
}
