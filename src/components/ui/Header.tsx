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

interface Props {}

export function Header(props: Props) {
  const { classes } = useStyles();
  return (
    <>
      <BaseHeader className={classes.base} height={80}>
        <Title>Concordia Unite</Title>
      </BaseHeader>
    </>
  );
}
