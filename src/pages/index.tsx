import { createStyles, Text, Title } from "@mantine/core";
import { HomeLayout } from "@layouts/guest/HomeLayout";
import { Hero } from "@features/homepage";

const useStyles = createStyles((theme) => ({
  candidateGrandient: {
    backgroundImage: theme.fn.linearGradient(
      50,
      theme.colors.orange[3],
      theme.colors.red[7]
    ),
    color: "transparent",
    backgroundClip: "text",
  },

  entityGradient: {
    backgroundImage: theme.fn.linearGradient(
      50,
      theme.colors.green[4],
      theme.colors.lime[5]
    ),
    color: "transparent",
    backgroundClip: "text",
  },

  heroTitle: {
    fontSize: "3em",

    [theme.fn.largerThan("md")]: {
      fontSize: "5em",
    },
  },

  heroBody: {
    fontSize: "1.5em",
    fontWeight: 100,

    [theme.fn.largerThan("md")]: {
      fontSize: "2.5em",
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  return (
    <HomeLayout title="Concordia Unite">
      <Hero button="Set up an Account Now!">
        <Title order={1} className={classes.heroTitle}>
          Connecting
          <span className={classes.candidateGrandient}> Candidates </span>
          and <span className={classes.entityGradient}>Entities</span> through
          Call
        </Title>
        <Text className={classes.heroBody}>
          Finding Candidates can be hard. But it shouldn't be. Concordia Unite
          connects LCMS Candidates all over the country to Calling Bodies
          looking for their next teacher, deaconess, etc.
        </Text>
      </Hero>
    </HomeLayout>
  );
}
