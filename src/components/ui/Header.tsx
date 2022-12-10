/**
 * Header.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * AppShell Header for Layouts
 */

// Imports
import { createStyles, Title } from "@mantine/core";
import { Header as BaseHeader } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  base: {
    backgroundColor: theme.colors.gray[3],
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "1em",
  },
}));

/**
 * ### Header
 * This header is used in guest layouts. It includes the application name
 * and that is it.
 */
export function Header() {
  const { classes } = useStyles();
  return (
    <>
      <BaseHeader className={classes.base} height={80}>
        <Title>Concordia Unite</Title>
      </BaseHeader>
    </>
  );
}
