import { Button, createStyles } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import type {
  CallingEntity,
  District,
  Grade,
  PlacementRequest,
} from "@prisma/client";
import { IconChecklist } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  hand: {
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.colors.gray[3],
    },
  },
}));

interface Props<T> {
  placementRequest: T;
  onCallClick: (requestId: number) => void;
  onRowClick: (requestId: number) => void;
}

export function SearchResultsRow<
  T extends PlacementRequest & {
    requestee: CallingEntity & { district: District };
    grades: Grade[];
  }
>(props: Props<T>) {
  const { classes, cx } = useStyles();
  const { ref, hovered } = useHover<HTMLTableCellElement>();
  return (
    <tr
      key={props.placementRequest.id}
      onClick={
        hovered ? undefined : () => props.onRowClick(props.placementRequest.id)
      }
      className={cx({ [classes.hand]: !hovered })}
    >
      <td>{props.placementRequest.positionPosition}</td>
      <td>
        {props.placementRequest.requestee.name} -{" "}
        {props.placementRequest.requestee.variant.valueOf()}
      </td>
      <td>
        {props.placementRequest.grades.map((grade) => grade.grade).join(", ")}
      </td>
      <td>{props.placementRequest.requestee.district.name}</td>
      <td>{props.placementRequest.requestee.district.region}</td>
      <td ref={ref}>
        <Button
          onClick={() => props.onCallClick(props.placementRequest.id)}
          leftIcon={<IconChecklist />}
        >
          Begin Call Process
        </Button>
      </td>
    </tr>
  );
}
