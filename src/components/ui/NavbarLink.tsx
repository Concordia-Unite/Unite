/**
 * NavbarLink.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * Sourced from Mantine UI
 */

// Imports
import type { TablerIcon } from "@tabler/icons";
import { createStyles, Tooltip, UnstyledButton } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
    },
  },
}));

interface Props {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

/**
 * ### NavbarLink
 * Buttons used on the Navbar for Authed Layouts.
 * It includes an icon, a tooltip, and an action for the button.
 */
export function NavbarLink({ icon: Icon, label, active, onClick }: Props) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}
