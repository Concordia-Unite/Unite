import type { Position } from "@prisma/client";
import { useHover, useId } from "@mantine/hooks";
import { useRouter } from "next/router";
import { ActionIcon, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { openConfirmModal } from "@mantine/modals";
import { notify } from "@lib/notification";
import { trpc } from "../../../../utils/trpc";

interface ApprovalRowProps<T> {
  placementRequest: T;
  for_: "university" | "calling-entity" | "district";
}

export function ApprovalRow<
  T extends {
    position: Position;
    id: string;
    createdAt: Date;
  }
>({ placementRequest, for_ }: ApprovalRowProps<T>) {
  const { hovered, ref } = useHover<HTMLTableDataCellElement>();
  const { mutateAsync: updatePlacementRequest } =
    trpc.placementRequest.updateStatus.useMutation();
  const approveId = useId();
  const denyId = useId();
  const router = useRouter();

  function approve() {
    openConfirmModal({
      title: "Approve Placement Request?",
      centered: true,
      children: (
        <Text>
          This Placement Request will be visible to candidates on your roster.
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Approve" },
      overlayBlur: 5,
      onConfirm() {
        notify(
          approveId,
          "Placement Request Approval",
          {
            onLoading: "Placement Request is being approved",
            onSuccess: "Placement Request successfully approved",
            onFailure: "Something went wrong.",
          },
          updatePlacementRequest({
            id: placementRequest.id,
            status: "Approved",
          })
        );
      },
    });
  }

  function deny() {
    openConfirmModal({
      title: "Deny Placement Request?",
      centered: true,
      children: (
        <Text>
          This Placement Request will not be visible to candidates on your
          roster.
        </Text>
      ),
      labels: { cancel: "Cancel", confirm: "Deny" },
      overlayBlur: 5,
      onConfirm() {
        notify(
          denyId,
          "Placement Request Denial",
          {
            onLoading: "Placement Request is being denied",
            onSuccess: "Placement Request successfully denied",
            onFailure: "Something went wrong.",
          },
          updatePlacementRequest({
            id: placementRequest.id,
            status: "Denied",
          })
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
          <ActionIcon onClick={() => approve()}>
            <IconCheck color={"green"} />
          </ActionIcon>
          <ActionIcon onClick={() => deny()}>
            <IconX color={"red"} />
          </ActionIcon>
        </td>
        <td>{placementRequest.createdAt.toLocaleDateString()}</td>
        <td>{placementRequest.position.replaceAll("_", " ")}</td>
      </tr>
    </>
  );
}
