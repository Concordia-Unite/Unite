/*
 * middleware.ts
 * Ian Kollipara
 * 2022-09-29
 *
 * NextJS Middleware
 */

// Imports
export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/create-candidate", "/profiles/:path*"],
};
