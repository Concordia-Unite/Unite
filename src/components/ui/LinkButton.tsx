/**
 * LinkButton.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * LinkButton Component
 */

// Imports
import type { ButtonProps } from "@mantine/core";
import { Button } from "@mantine/core";
import Link from "next/link";

interface Props extends ButtonProps {
  href: string;
}

/**
 * ### LinkButton
 * A wrapper around Mantine's button and Next.js's Link,
 * this allows for better display of Links as Buttons.
 */
export function LinkButton({ href, ...rest }: Props) {
  return (
    <>
      <Link href={href}>
        <Button {...rest} />
      </Link>
    </>
  );
}
