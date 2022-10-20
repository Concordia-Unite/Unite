/**
 * link-button.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Link Button
 */

import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";

interface LinkButtonProps extends ButtonProps {
  href: string;
}

export const LinkButton = ({ href, ...rest }: LinkButtonProps) => (
  <Link href={href} passHref>
    <Button component="a" {...rest} />
  </Link>
);
