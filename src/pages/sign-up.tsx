import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Avatar, createStyles, Paper, Text, Title } from "@mantine/core";
import { HomeLayout } from "@layouts/HomeLayout";
import { LinkButton } from "@ui/LinkButton";
import { IconSchool } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "80vw",
    marginLeft: "auto",
    marginRight: "auto",

    [theme.fn.largerThan("md")]: {
      flexDirection: "row",
      maxWidth: "60vw",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  },

  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    marginTop: "1em",
    height: "30vh",
    padding: 10,

    [theme.fn.largerThan("md")]: {
      marginLeft: "1em",
    },
  },
  cardText: {
    fontSize: "1.2em",
  },

  cardBtn: {
    width: "100%",
  },
}));

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   //
// };

export default function SignUp() {
  //   props: InferGetServerSidePropsType<typeof getServerSideProps>
  const { classes } = useStyles();

  return (
    <HomeLayout title="Sign Up">
      <Title align="center" order={1}>
        Create an Account
      </Title>
      <main className={classes.layout}>
        <Paper withBorder className={classes.card}>
          <Title order={2}>Candidate</Title>
          <Avatar size={"xl"} radius={"xl"} />
          <Text className={classes.cardText} component="p">
            A profile for those looking for calls. This is ideal for new
            graduates and workers already in the field.
          </Text>
          <LinkButton className={classes.cardBtn} href="/candidates/create">
            Create Now!
          </LinkButton>
        </Paper>
        <Paper withBorder className={classes.card}>
          <Title order={2}>Calling Entity</Title>
          <Avatar size={"xl"} radius={"xl"}>
            <IconSchool size={"50"} />
          </Avatar>
          <Text className={classes.cardText} component="p">
            A profile for schools, churches, RSOs, etc. who are looking to call
            candidates. This is ideal for bodies struggling to find qualified
            candidates, or want to level up their search.
          </Text>
          <LinkButton
            className={classes.cardBtn}
            href="/calling-entities/create"
          >
            Create Now!
          </LinkButton>
        </Paper>
      </main>
    </HomeLayout>
  );
}
