/* login.tsx
 * Ian Kollipara
 * 2022-09-28
 *
 * Login Page
 */

// Imports
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
    AppShell,
    Title,
    Text,
    Stack,
    Space,
    Center,
    Paper,
    Divider,
    createStyles,
    Button,
    Image,
    SimpleGrid,
    Group,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import CuneLogo from "@/components/cune-logo";
import Header from "@/components/header";
import SpotifyButton from "@/components/spotify-button";

const useStyles = createStyles((theme) => ({
    wrapper: {
        backgroundImage:
            "url(https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
        backgroundSize: "cover",
    },

    centered: {
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            paddingTop: "25%",
        },
    },

    leftSide: {
        maxWidth: "450px",
        marginTop: "10%",
        minHeight: "75%",
        paddingTop: "10%",

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
    const { data: session, status } = useSession();

    const { classes } = useStyles();
    const router = useRouter();

    if (status === "unauthenticated") {
        return (
            <AppShell className={classes.wrapper} header={<Header />}>
                <Paper className={classes.leftSide} shadow="lg">
                    <Center className={classes.centered}>
                        <CuneLogo className={classes.scalableImage} />
                    </Center>
                    <Title order={1} align="center">
                        Welcome Back!
                    </Title>
                    <Stack style={{ padding: "1em" }}>
                        <Button>Login with Google</Button>
                        <SpotifyButton>Login with Spotify</SpotifyButton>
                        <Button>Login with Microsoft</Button>
                    </Stack>
                </Paper>
            </AppShell>
        );
    } else if (status === "authenticated") {
        router.push(router.query.callbackUrl || "/");
    }
};

export default Login;
