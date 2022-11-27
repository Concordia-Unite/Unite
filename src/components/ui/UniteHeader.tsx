import { Group, Header, Title, Text } from "@mantine/core";

interface UniteHeaderProps {
  modifier?: string;
}
export function UniteHeader({ modifier }: UniteHeaderProps) {
  return (
    <>
      <Header height={60} fixed px={"xs"}>
        <Group align={"baseline"} position={"left"}>
          <Title>Unite </Title>
          <Text color={"dimmed"} size={"sm"}>
            {modifier}
          </Text>
        </Group>
      </Header>
    </>
  );
}
