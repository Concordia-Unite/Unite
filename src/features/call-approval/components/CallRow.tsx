import { CallStatus } from "@enums/call-status";
import { createStyles, ThemeIcon } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import type { RouterOutputs } from "@services/trpc";
import { IconCheck, IconX } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  hand: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colors.gray[3],
    },
  },

  themeIconCheck: {
    backgroundColor: "transparent",
    cursor: "pointer",
    color: theme.colors.green[5],
    marginRight: "1em",

    "&:hover": {
      backgroundColor: theme.colors.green[5],
      color: theme.white,
    },

    "&:active": {
      backgroundColor: theme.colors.green[7],
      color: theme.white,
    },
  },

  themeIconX: {
    backgroundColor: "transparent",
    cursor: "pointer",
    color: theme.colors.red[5],

    "&:hover": {
      backgroundColor: theme.colors.red[5],
      color: theme.white,
    },

    "&:active": {
      backgroundColor: theme.colors.red[7],
      color: theme.white,
    },
  },
}));

interface Props {
  call: NonNullable<RouterOutputs["university"]["getAllCalls"]>[0];
  onApprove: (callId: number) => void;
  onDeny: (callId: number) => void;
  onRowClick: (callId: number) => void;
}

export function CallRow(props: Props) {
  const { classes, cx } = useStyles();
  const { ref, hovered } = useHover<HTMLTableCellElement>();
  return (
    <>
      <tr
        className={cx({ [classes.hand]: !hovered })}
        onClick={hovered ? undefined : () => props.onRowClick(props.call.id)}
      >
        <td>{props.call.status}</td>
        <td>{props.call.placementRequest.positionPosition}</td>
        <td>{props.call.candidate.user.name}</td>
        <td>
          {props.call.placementRequest.requestee.name} -{" "}
          {props.call.placementRequest.requestee.variant.valueOf()}
        </td>
        {props.call.status === CallStatus.Expressed ? (
          <td ref={ref}>
            <ThemeIcon
              className={classes.themeIconCheck}
              onClick={() => props.onApprove(props.call.id)}
            >
              <IconCheck />
            </ThemeIcon>
            <ThemeIcon
              className={classes.themeIconX}
              onClick={() => props.onDeny(props.call.id)}
            >
              <IconX />
            </ThemeIcon>
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    </>
  );
}
