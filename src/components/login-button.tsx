/**
 * login-button.tsx
 * Ian Kollipara
 * 2022.10.15
 *
 * Login/Logout Button
 */

import { Button, ButtonProps } from "@mantine/core";
import { LinkButton } from "./link-button";
import { signOut } from "next-auth/react";
import { IconLogout, IconLogin } from "@tabler/icons";

interface LoginButtonProps extends ButtonProps {
  status: "authenticated" | "loading" | "unauthenticated";
}

export const LoginButton = ({ status, ...rest }: LoginButtonProps) => {
  if (status === "authenticated")
    return (
      <Button leftIcon={<IconLogout />} onClick={() => signOut()} {...rest}>
        Logout
      </Button>
    );
  else
    return (
      <LinkButton leftIcon={<IconLogin />} href="/login" {...rest}>
        Login
      </LinkButton>
    );
};
