/**
 * header.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Header Component of App Shell
 */

import { Button, Group, Header as BaseHeader, Title } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons";

// TODO

export const Header = () => {
  return (
    <BaseHeader height={60} p="xs" fixed>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Title>Unite</Title>
        <Button variant="subtle" radius={"xl"} leftIcon={<IconUserCircle />}>
          My Profile
        </Button>
      </Group>
    </BaseHeader>
  );
};
