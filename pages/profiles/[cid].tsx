/**
 * [cid].tsx
 * Ian Kollipara
 * 2022-09-26
 * Candidate Profile Page
 **/

import type { Candidate } from "@prisma/client";
import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import client from "@/lib/prismadb";
import { Option, Some, None } from "@sniptt/monads";
import { Title, Avatar, AppShell, Stack, createStyles } from "@mantine/core";
import Header from "@/components/header";

const useStyles = createStyles((theme) => ({
    profilePic: {
        minWidth: "50vh",
        minHeight: "50vh",
        padding: "1em",
    },
}));

const ProfilePage: NextPage = (props: Candidate | null) => {
    const router = useRouter();
    const { classes } = useStyles();

    if (props === null) router.push("/create-candidate");

    const candidate = props as Candidate;

    return (
        <AppShell header={<Header />}>
            <Stack align="center">
                <Avatar className={classes.profilePic} color="cyan" />
                <Title>
                    {candidate.firstName} {candidate.lastName}
                </Title>
                <Title>{candidate.phoneNumber}</Title>
                <Title>{candidate.isMarried ? "Married" : "Single"}</Title>
                <Title>{candidate.wasRostered ? "Rostered" : "UnRostered"}</Title>
            </Stack>
        </AppShell>
    );
};

// Backend
const getCandidateFromMe = async (
    context: GetServerSidePropsContext
): Promise<Option<Candidate>> => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    const currentCandidate = await client.candidate.findUnique({
        where: {
            email: session?.user?.email as string,
        },
    });

    if (currentCandidate) return Some(currentCandidate);
    return None;
};

const getCandidateFromCid = async (
    context: GetServerSidePropsContext
): Promise<Option<Candidate>> => {
    const { cid } = context.query;

    const candidate = await client.candidate.findUnique({
        where: {
            cid: cid as string,
        },
    });

    if (candidate) return Some(candidate);
    return None;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { cid } = context.query;

    const candidate =
        cid === "me"
            ? await getCandidateFromMe(context)
            : await getCandidateFromCid(context);

    if (candidate.isNone()) return { props: null };
    if (candidate.isSome()) return { props: candidate.unwrap() };
};

export default ProfilePage;
