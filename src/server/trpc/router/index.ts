// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { candidateRouter } from "./candidate";

export const appRouter = t.router({
  candidate: candidateRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
