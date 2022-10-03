/*
 * spotify-button.tsx
 * Ian Kollipara
 * 2022-09-29
 *
 * Spotify Login Button
 */

// Imports
import { Button, createStyles } from "@mantine/core";
import type { DefaultProps } from "@mantine/styles";
import { IconBrandSpotify } from "@tabler/icons";
import { signIn } from "next-auth/react";

const useStyles = createStyles((theme) => ({}));

interface SpotifyButtonProps extends DefaultProps {
  children?: JSX.Element[];
}

const SpotifyButton = ({ children, className }: SpotifyButtonProps) => {
  const { classes } = useStyles();

  return (
    <Button
      className={className}
      radius="xl"
      color="lime"
      onClick={() => signIn("spotify")}
      leftIcon={<IconBrandSpotify />}
    >
      {children && children}
    </Button>
  );
};

export default SpotifyButton;
