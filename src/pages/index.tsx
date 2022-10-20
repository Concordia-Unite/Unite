/**
 * index.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Landing Page
 */

import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { Header } from "../components/header";

import { createStyles, Container, Title, Text, Button } from "@mantine/core";
import { LinkButton } from "../components/link-button";
import { DefaultLayout } from "../components/layouts/default";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(250deg, rgba(23, 43, 84, 0) 0%, #062343 70%), url(https://www.cune.edu/application/files/2815/7626/7755/HomepageSpring2016.jpg)",
    paddingTop: theme.spacing.lg * 3,
    paddingBottom: theme.spacing.lg * 3,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.lg * 2,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
}));

export function HeroImageRight() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
              >
                New Way
              </Text>{" "}
              to Connect Candidates and Calling Bodies
            </Title>

            <Text className={classes.description} mt={30}>
              Concordia Unite connects LCMS church workers with bodies all
              around the country. Don't frustrate yourself over manual
              communication. Look for jobs all over the place.
            </Text>

            <LinkButton
              variant="gradient"
              href="/create-candidate"
              gradient={{ from: "pink", to: "yellow" }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}

const LandingPage: NextPage = () => (
  <>
    <Head>
      <title>Concordia Unite</title>
    </Head>
    <DefaultLayout>
      <HeroImageRight />
    </DefaultLayout>
  </>
);

export default LandingPage;
