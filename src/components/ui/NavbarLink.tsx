import { createStyles, Tooltip, UnstyledButton } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import Link from "next/link";

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
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background ?? theme.primaryColor,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background ?? theme.primaryColor,
        0.15
      ),
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  href: string;
  active?: boolean;
}

export const NavbarLink = ({
  icon: Icon,
  label,
  href,
  active,
}: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        component={Link}
        href={href}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};
