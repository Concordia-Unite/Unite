import { createStyles, Tooltip, UnstyledButton } from "@mantine/core";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons";

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

interface LogoutButtonProps {
  active?: boolean;
}

export function LogoutButton({ active }: LogoutButtonProps) {
  const { classes, cx } = useStyles();
  return (
    <>
      <Tooltip label={"Logout"} position={"right"} transitionDuration={0}>
        <UnstyledButton
          onClick={() => signOut()}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <IconLogout stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    </>
  );
}
