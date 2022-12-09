import { createStyles, Button } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import type { ReactNode } from "react";

const useStyles = createStyles((theme) => ({
  hero: {
    backgroundImage: theme.fn.linearGradient(
      25,
      theme.colors.cyan[4],
      theme.colors.blue[8]
    ),
    height: "25vh",
    objectPosition: "center",
    objectFit: "cover",
    display: "grid",
    placeItems: "center",
    paddingLeft: "1em",
    paddingRight: "1em",

    [theme.fn.largerThan("md")]: {
      height: "40vh",
    },
  },

  heroBody: {
    color: theme.white,

    [theme.fn.largerThan("md")]: {
      maxWidth: "80vw",
    },
  },
}));

interface Props {
  button?: string;
  href?: string;
  children: ReactNode;
}

export function Hero(props: Props) {
  const { classes, theme } = useStyles();
  const { hovered, ref } = useHover<HTMLAnchorElement>();
  return (
    <>
      <section className={classes.hero}>
        <span className={classes.heroBody}>
          {props.children}
          {props.button && (
            <Button
              component="a"
              href="/login"
              ref={ref}
              size={theme.fn.largerThan("lg") ? "lg" : "xs"}
              variant={hovered ? "filled" : "white"}
            >
              {props.button}
            </Button>
          )}
        </span>
      </section>
    </>
  );
}
