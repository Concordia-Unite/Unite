/**
 * RequestRow.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * Placement Request Row
 */

// Imports
import type {
  DistrictPlacementRequest,
  Grade,
  PlacementRequest,
  UniversityPlacementRequest,
} from "@prisma/client";
import { ActionIcon, createStyles } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  rowHover: {
    "&:hover": {
      backgroundColor: theme.colors.gray[3],
    },
  },

  actionBtns: {
    display: "inline-flex",
  },
}));

interface Props {
  placementRequest: (DistrictPlacementRequest | UniversityPlacementRequest) & {
    placementRequest: PlacementRequest & {
      requestee: {
        name: string;
      };
      grades: Grade[];
    };
  };
  onApprove: (placementRequestId: number) => void;
  onDenied: (placementRequestId: number) => void;
}

/**
 * ### RequestRow
 *
 * This handles the display of a single Request, and handles the display of success or failure.
 */
export function RequestRow(props: Props) {
  const { classes, theme } = useStyles();
  return (
    <>
      <tr key={props.placementRequest.id} className={classes.rowHover}>
        <td>{props.placementRequest.placementRequest.requestee.name}</td>
        <td>{props.placementRequest.placementRequest.positionPosition}</td>
        <td>
          {props.placementRequest.placementRequest.grades
            .map((grade) => grade.grade)
            .join(", ")}
        </td>
        <td className={classes.actionBtns}>
          <ActionIcon
            mr={"md"}
            onClick={() =>
              props.onApprove(props.placementRequest.placementRequest.id)
            }
          >
            <IconCheck color={theme.colors.green[5]} />
          </ActionIcon>
          <ActionIcon
            onClick={() =>
              props.onDenied(props.placementRequest.placementRequest.id)
            }
          >
            <IconX color={theme.colors.red[5]} />
          </ActionIcon>
        </td>
      </tr>
    </>
  );
}
