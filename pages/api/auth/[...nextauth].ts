import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import client from "../../../lib/prismadb";

export const authOptions = {
    // Configure one or more authentication providers
    pages: {
        signIn: "/login",
    },
    adapters: PrismaAdapter(client),
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT as string,
            clientSecret: process.env.SPOTIFY_SECRET as string,
        }),
        // ...add more providers here
    ],
};

export default NextAuth(authOptions);
