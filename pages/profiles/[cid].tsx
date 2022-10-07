/**
 * [cid].tsx
 * Ian Kollipara
 * 2022-09-26
 * Candidate Profile Page
 **/

import type {
  Candidate,
  CandidateAddress,
  CandidateEducation,
  School,
} from "@prisma/client";
import type {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { AppShell, useMantineTheme, Grid } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Header from "@/components/header";

import { Option, Some, None } from "@sniptt/monads";

import client from "@/lib/prismadb";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileEducation from "@/components/profile/profile-education";
import ProfileBiography from "@/components/profile/profile-biography";

type FullCandidate = Candidate & {
  addresses: CandidateAddress[];
  attended: (CandidateEducation & { at: School })[];
};

function useVariablePosition(width: number, breakpoint: number) {
  return (truthy: string, falsy: string) =>
    width < breakpoint ? truthy : falsy;
}

const ProfilePage: NextPage<{ candidate: FullCandidate }> = ({
  candidate,
}: {
  candidate: FullCandidate;
}) => {
  const router = useRouter();
  const { width } = useViewportSize();
  const theme = useMantineTheme();

  const setPosition = useVariablePosition(width, theme.breakpoints.md);

  return (
    <AppShell header={<Header />}>
      <ProfileHeader
        candidate={candidate}
        position={setPosition("center", "left")}
        alignment={setPosition("center", "flex-start")}
      />
      <Grid
        style={{ minWidth: "99.6vw" }}
        justify="space-around"
        align="flex-start"
      >
        <Grid.Col sm={12} md={6}>
          <ProfileEducation
            education={candidate.attended}
            alignment={setPosition("center", "left")}
          />
        </Grid.Col>
        <Grid.Col sm={12} md={6}>
          <ProfileBiography
            cid={candidate.cid}
            initialBiography={candidate.biography}
            isMe={router.query.cid === "me"}
          />
        </Grid.Col>
      </Grid>
    </AppShell>
  );
};

// Backend
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cid } = context.query;

  const candidate =
    cid === "me"
      ? await getCandidateFromMe(context)
      : await getCandidateFromCid(context);

  if (candidate.isNone())
    return {
      redirect: {
        destination: "/create-candidate",
        permanent: false,
      },
    };
  return { props: { candidate: candidate.unwrap() } };
};

async function getCandidateFromMe(
  context: GetServerSidePropsContext
): Promise<Option<Candidate>> {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) return None;

  const currentCandidate = await client.candidate.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      attended: {
        include: {
          at: true,
        },
      },
      addresses: true,
    },
  });

  if (currentCandidate) return Some(currentCandidate);
  return None;
}

async function getCandidateFromCid(
  context: GetServerSidePropsContext
): Promise<Option<Candidate>> {
  const { cid } = context.query;

  const candidate = await client.candidate.findUnique({
    where: {
      cid: cid as string,
    },
    include: {
      attended: {
        include: {
          at: true,
        },
      },
      addresses: true,
    },
  });

  if (candidate) return Some(candidate);
  return None;
}

export default ProfilePage;
