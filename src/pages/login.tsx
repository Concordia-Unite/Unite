/**
 * login.tsx
 * Ian Kollipara
 * 2022.10.07
 *
 * Login Page
 */

import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AppShell,
  Button,
  Center,
  Divider,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { createStyles } from "@mantine/core";
import { UniteHeader } from "../components/ui/UniteHeader";
import { LinkButton } from "../components/ui/LinkButton";
import { IconBrandGoogle } from "@tabler/icons";
import { useHover } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
    backgroundSize: "cover",
  },

  centered: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingTop: "5%",
    },
  },

  leftSide: {
    maxWidth: "450px",
    marginTop: "10%",
    minHeight: "75%",
    paddingTop: "5%",

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      minHeight: "50%",
      maxWidth: "50%",
      marginTop: "0%",
      position: "fixed",
      left: "25%",
      top: "25%",
      paddingTop: "1em",
    },
    [`@media (max-width: 400px)`]: {
      minHeight: "50%",
      maxWidth: "100%",
      position: "relative",
      left: "0%",
      top: "0%",
    },
  },

  scalableImage: {
    maxWidth: "25%",
  },
}));

const Login: NextPage = () => {
  const { classes } = useStyles();
  const session = useSession();

  return (
    <AppShell
      header={<UniteHeader />}
      className={classes.wrapper}
    >
      <Paper className={classes.leftSide} shadow="lg">
        <Title order={1} align="center">
          Welcome Back!
        </Title>
        <Stack style={{ padding: "1em" }}>
          <Button
            radius={"xl"}
            leftIcon={<IconBrandGoogle />}
            variant="outline"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/candidates/dashboard",
              })
            }
          >
            Candidate Login
          </Button>
          <Button
            leftIcon={<IconBrandGoogle />}
            variant="outline"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/organizations/dashboard",
              })
            }
            radius={"xl"}
          >
            Organization Login
          </Button>
          <Button
            leftIcon={<IconBrandGoogle />}
            variant="outline"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/district/dashboard",
              })
            }
            radius={"xl"}
          >
            District Login
          </Button>
          <Button
            leftIcon={<IconBrandGoogle />}
            variant="outline"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/institutions/dashboard",
              })
            }
            radius={"xl"}
          >
            Institution Login
          </Button>
          <Divider />
          <Title align="center">Don't have an Account?</Title>
          <LinkButton href="/signup" radius={"xl"}>
            Sign Up Here
          </LinkButton>
        </Stack>
      </Paper>
    </AppShell>
  );
};

export default Login;
