import { Group, Button, Space } from "@mantine/core";

export function CallButton({ addPadding }: { addPadding: boolean }) {
  return (
    <>
      {addPadding && <Space h={"xl"} />}
      <Group align={"center"}>
        <Button variant="light" size="md" radius={"xl"}>
          Extend a Call
        </Button>
      </Group>
    </>
  );
}

export default CallButton;
