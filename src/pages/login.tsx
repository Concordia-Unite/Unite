import { Button, createStyles, Paper, Title } from "@mantine/core";
import { LoginLayout } from "@layouts/guest/LoginLayout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  form: {
    paddingTop: "5em",
    height: "40vh",
    backgroundColor: theme.colors.gray[2],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.fn.largerThan("md")]: {
      maxWidth: "25vw",
      height: "93vh",
      overflow: "hidden",
    },
  },
}));

export default function Login() {
  //   props: InferGetServerSidePropsType<typeof getServerSideProps>
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <LoginLayout title="Login">
      <Paper className={classes.form} shadow="md">
        <Title order={1}>Welcome Back!</Title>
        <Button
          mt="lg"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/candidates/me" || router.route,
            })
          }
        >
          Login with Google
        </Button>
      </Paper>
    </LoginLayout>
  );
}
