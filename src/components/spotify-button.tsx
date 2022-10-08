/**
 * spotify-button.tsx
 * Ian Kollipara
 * 2022.10.07
 *
 * Spotify Login Button
 */

import { Button } from "@mantine/core";
import type { DefaultProps } from "@mantine/styles";
import { IconBrandSpotify } from "@tabler/icons";
import { signIn } from "next-auth/react";

interface SpotifyButtonProps extends DefaultProps {
  children?: JSX.Element[] | string;
}

export const SpotifyButton = ({ children, className }: SpotifyButtonProps) => {
  return (
    <Button
      className={className}
      radius="xl"
      color="lime"
      onClick={() => signIn("spotify")}
      leftIcon={<IconBrandSpotify />}
    >
      {children}
    </Button>
  );
};
