/**
 * google-button.tsx
 * Ian Kollipara
 * 2022.10.07
 *
 * Google Login Button
 */

import { Button, ButtonProps } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons";
import { signIn } from "next-auth/react";

interface GoogleButtonProps extends ButtonProps {}

export const GoogleButton = ({ children, className }: GoogleButtonProps) => {
  return (
    <Button
      className={className}
      radius="xl"
      color="blue"
      onClick={() => signIn("google")}
      leftIcon={<IconBrandGoogle />}
    >
      {children}
    </Button>
  );
};
