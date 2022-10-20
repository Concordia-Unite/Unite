/**
 * signup.tsx
 * Ian Kollipara
 * 2022.10.17
 *
 * Sign Up Page
 */

import { Title, Button, Text, Card, Stack, Grid } from "@mantine/core";
import type { NextPage } from "next";
import { DefaultLayout } from "../components/layouts/default";

const SignUp: NextPage = () => {
  return (
    <DefaultLayout>
      <Stack align={"center"}>
        <Title size={"xx-large"} align={"center"}>
          Sign Up
        </Title>
        <Text>Choose the kind of Account to create!</Text>
      </Stack>
      <Grid align={"center"} mx={0}>
        <Grid.Col md={12} lg={6}>
          <Card withBorder shadow={"lg"}>
            <Stack align={"center"}>
              <Title>Organization</Title>
              <Text>
                This is the calling body. These accounts belong to congregations
                and schools with would like to call a Candidate. These accounts
                can make Job Posts
              </Text>
              <Button variant={"filled"}>As an Organization</Button>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col md={12} lg={6}>
          <Card withBorder shadow={"lg"}>
            <Stack align={"center"}>
              <Title>Candidate</Title>
              <Text>
                A Candidate is an potential hiring account. This is the account
                for recent graduates or already rostered church workers.
                Candidates may view their own profile and view available jobs.
                They may also initiate a call to a position.
              </Text>
              <Button variant={"filled"}>As an Candidate</Button>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col md={12} lg={6}>
          <Card withBorder shadow={"lg"}>
            <Stack align={"center"}>
              <Title>Institution</Title>
              <Text>
                Institutions are CUS schools, which produce Candidates. These
                schools have directors for non-rostered placement, which is
                these accounts can manage.
              </Text>
              <Button variant={"filled"}>As an Institution</Button>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col md={12} lg={6}>
          <Card withBorder shadow={"lg"}>
            <Stack align={"center"}>
              <Title>District</Title>
              <Text>
                A District is one of the LCMS 35 Districts. Each district
                manages a list of Candidates in their area, as well as approving
                Job postings.
              </Text>
              <Button variant={"filled"}>As an District</Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </DefaultLayout>
  );
};

export default SignUp;
