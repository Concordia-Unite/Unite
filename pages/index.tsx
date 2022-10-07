import type { NextPage } from "next";
import Head from "next/head";
import {
  AppShell,
  Title,
  Text,
  BackgroundImage,
  Space,
  Overlay,
  Group,
  Center,
  createStyles,
  Image,
  Box,
  Stack,
} from "@mantine/core";
import Header from "@/components/header";
import CuneLogo from "@/components/cune-logo";

const useStyles = createStyles((theme) => ({
  subtitle: {
    paddingLeft: "10%",
  },

  logo: {
    maxWidth: "5%",
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <AppShell padding={0} header={<Header />}>
      <BackgroundImage src="https://imgs.search.brave.com/H4kPaBl9gBN2hUFyHOGbvOC_MfCxa4aYBap5Hu2zvTc/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly93d3cu/Y3VuZS5lZHUvYXBw/bGljYXRpb24vZmls/ZXMvMjgxNS83NjI2/Lzc3NTUvSG9tZXBh/Z2VTcHJpbmcyMDE2/LmpwZw">
        <Group
          style={{ paddingTop: "1%", minHeight: "20vh" }}
          position="center"
        >
          <CuneLogo white className={classes.logo} />
          <Title style={{ zIndex: 1 }} color="white" order={1}>
            Concordia Unite!
          </Title>
        </Group>
      </BackgroundImage>
      <Group position="center">
        <Image
          width={"60vw"}
          src="https://www.lcms.org/image/resources/LCMS-Region-District-Map.png"
        />
        <Stack align={"center"}>
          <Title>Find Jobs at Any District</Title>
          <Text size={20}>
            Use Concordia Unite to find a called position at any of the LCMS
            districts. <br /> Jobs are sorted by their district, and so are
            calling bodies.
          </Text>
        </Stack>
      </Group>
    </AppShell>
  );
};

export default Home;
