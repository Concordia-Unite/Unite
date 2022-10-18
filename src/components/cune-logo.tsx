/**
 * cune-logo.tsx
 * Ian Kollipara
 * 2022.10.07
 *
 * CUNE Logo
 */

import { Image, Text } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";

interface CuneLogoProps extends DefaultProps {
  white: boolean;
}

export const CuneLogo = ({ className, white = false }: CuneLogoProps) => {
  return (
    <Image
      className={className}
      style={{
        filter: white ? "brightness(0) invert(1)" : "",
      }}
      src="https://imgs.search.brave.com/eu5QFHU6_J20Vjkw9pKzWyApsIydudR0WI2RsDvgc6k/rs:fit:1080:1080:1/g:ce/aHR0cHM6Ly9waXRj/aGVuZ2luZWxpdmUu/YmxvYi5jb3JlLndp/bmRvd3MubmV0L2Rl/di9iYmY1ZWQxNS05/NjY3LTRkZTUtYTJh/Zi0yZjgyMmZhZWIx/NWYvMmJjODQ1ODct/OWI5OC00ZDZkLWFh/ZjgtNWNkMTQ1NjA2/NjUzLnBuZw"
    />
  );
};