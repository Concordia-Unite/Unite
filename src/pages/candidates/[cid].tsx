/**
 * [cid].tsx
 * Ian Kollipara
 * 2022.10.07
 *
 * Candidate Profile Page
 */

import { trpc } from "../../utils/trpc";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useSession } from "next-auth/react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useViewportSize } from "@mantine/hooks";
import { AppShell, Grid, Title, useMantineTheme, Text } from "@mantine/core";
import { CandidateShort } from "../../components/candidate-short";
import { CandidateEducation } from "../../components/candidate-education";
import type {
  CandidateEducation as CandidateEducationType,
  School,
} from "@prisma/client";
import { Header } from "../../components/header";

function useVariablePosition(width: number, breakpoint: number) {
  return (truthy: string, falsy: string) =>
    width < breakpoint ? truthy : falsy;
}

const CandidateProfile: NextPage = () => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const cid = router.query.cid as string;
  const candidate =
    cid === "me"
      ? trpc.candidate.getByUid.useQuery({
          uid: useSession({ required: true }).data?.user?.id,
          includeAddresses: true,
          includeEducation: true,
          includeSchools: true,
        })
      : trpc.candidate.getByCid.useQuery({
          cid: cid,
          includeAddresses: true,
          includeEducation: true,
          includeSchools: true,
        });
  const setPosition = useVariablePosition(width, theme.breakpoints.md);

  if (candidate.data) {
    return (
      <AppShell header={<Header />}>
        <CandidateShort
          candidate={candidate.data}
          position={setPosition("center", "left")}
          alignment={setPosition("center", "flex-start")}
        />
        <Grid
          style={{ minWidth: "99.6vw" }}
          justify="space-around"
          align="flex-start"
        >
          <Grid.Col sm={12} md={6}>
            <Title align="center">Education</Title>
            {candidate.data.attended.map((s) => (
              <CandidateEducation
                education={s as CandidateEducationType & { at: School }}
              />
            ))}
          </Grid.Col>
          <Grid.Col sm={12} md={6}>
            <Title align="center">Biography</Title>
            <Text
              dangerouslySetInnerHTML={{ __html: candidate.data.biography }}
            ></Text>
          </Grid.Col>
        </Grid>
      </AppShell>
    );
  }
};

export default CandidateProfile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/create-candidate",
        permanent: false,
      },
    };
  }
};
