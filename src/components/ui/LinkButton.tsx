import type { ButtonProps } from "@mantine/core";
import { Button } from "@mantine/core";
import Link from "next/link";

interface LinkButtonProps extends ButtonProps {
  href: string
}

export function LinkButton({ href, ...rest }: LinkButtonProps) {
  return (
    <>
      <Button component={Link} href={href} {...rest} />
    </>
  )
}