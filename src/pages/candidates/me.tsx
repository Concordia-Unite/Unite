/**
 * me.tsx
 * Ian Kollipara
 * 2022.10.13
 *
 * Candidate Personal Profile Page
 */

import type { NextPage, GetServerSideProps } from "next";
import { trpc } from "../../utils/trpc";
import { useViewportSize } from "@mantine/hooks";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import {
  Grid,
  Loader,
  Title,
  Text,
  useMantineTheme,
  Stack,
} from "@mantine/core";
import { CandidateShort } from "../../components/candidate-short";
import { CandidateEducation } from "../../components/candidate-education";
import { LinkButton } from "../../components/link-button";
import { CandidateLayout } from "../../components/layouts/candidate";

function useVariablePosition(width: number, breakpoint: number) {
  return (truthy: string, falsy: string) =>
    width < breakpoint ? truthy : falsy;
}

const CandidatePersonalProfile: NextPage = () => {
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const candidate = trpc.candidate.getCurrentFull.useQuery();

  const setPosition = useVariablePosition(width, theme.breakpoints.md);

  if (candidate.isError)
    return (
      <CandidateLayout>
        <Stack align={"center"}>
          <Title>Uh Oh!</Title>
          <Text>
            Looks like you don't have a candidate profile yet. Why don't you
            create one here?
          </Text>
          <LinkButton href="/create-candidate">
            Create your candidate!
          </LinkButton>
        </Stack>
      </CandidateLayout>
    );

  if (candidate.data)
    return (
      <CandidateLayout>
        <CandidateShort
          candidate={candidate.data}
          position={setPosition("center", "left")}
          alignment={setPosition("center", "flex-start")}
        />
        <Grid grow justify={"space-around"} align="flex-start">
          <Grid.Col sm={12} md={6}>
            <Title align="center">Education</Title>
            {candidate.data.attended.map((s) => {
              <CandidateEducation education={s} />;
            })}
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Title align="center">Biography</Title>
            <Text
              dangerouslySetInnerHTML={{ __html: candidate.data.biography }}
            />
          </Grid.Col>
        </Grid>
      </CandidateLayout>
    );
  else
    return (
      <CandidateLayout>
        <Stack align={"center"}>
          <Title>Uh Oh!</Title>
          <Text>
            Looks like you don't have a candidate profile yet. Why don't you
            create one here?
          </Text>
          <LinkButton href="/create-candidate">
            Create your candidate!
          </LinkButton>
        </Stack>
      </CandidateLayout>
    );
};

export default CandidatePersonalProfile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
