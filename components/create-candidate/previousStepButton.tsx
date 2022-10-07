import { Button, DefaultProps } from "@mantine/core";
import { MouseEventHandler } from "react";

interface PreviousStepButtonProps extends DefaultProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function PreviousStepButton({
  className,
  onClick,
}: PreviousStepButtonProps) {
  return (
    <Button className={className} variant="default" onClick={onClick}>
      Back
    </Button>
  );
}
