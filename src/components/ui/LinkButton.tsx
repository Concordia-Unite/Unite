import type { ButtonProps } from "@mantine/core";
import { Button, createStyles } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props extends ButtonProps {
  href: string;
}

export function LinkButton({ href, ...rest }: Props) {
  return (
    <>
      <Link href={href}>
        <Button {...rest} />
      </Link>
    </>
  );
}
