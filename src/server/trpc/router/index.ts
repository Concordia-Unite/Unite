// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { candidateRouter } from "./candidate";
import { schoolRouter } from "./school";

export const appRouter = t.router({
  school: schoolRouter,
  candidate: candidateRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
