/**
 * header-base.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Header Component Base
 */

import {
  Burger,
  Group,
  Header as BaseHeader,
  Title,
  Drawer,
  createStyles,
  Box,
  Stack,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { ReactNode } from "react";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));

export const ResponsiveHeader = ({
  brand,
  children,
}: {
  brand: ReactNode;
  children: ReactNode;
}) => {
  const [drawerOpened, { toggle: drawerToggle, close: drawerClose }] =
    useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Box>
      <BaseHeader height={60} p="xs" fixed>
        <Group
          className={classes.hiddenMobile}
          sx={{ height: "100%" }}
          px={20}
          position="apart"
        >
          {brand}
          <Group align={"center"}>{children}</Group>
        </Group>
        <Group className={classes.hiddenDesktop} position="apart">
          {brand}
          <Burger
            onClick={drawerToggle}
            opened={drawerOpened}
            className={classes.hiddenDesktop}
          />
        </Group>
      </BaseHeader>
      <Drawer
        className={classes.hiddenDesktop}
        opened={drawerOpened}
        onClose={drawerClose}
        size="100%"
        zIndex={1000}
        padding="md"
      >
        <Stack align={"center"} justify={"flex-start"}>
          {brand}
          {children}
        </Stack>
      </Drawer>
    </Box>
  );
};
