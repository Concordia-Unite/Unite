// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { candidateRouter } from "./candidate";
import { districtRouter } from "./district";
import { institutionRouter } from "./institution";
import { jobRouter } from "./job";
import { organizationRouter } from "./organization";
import { placementDirectorRouter } from "./placementDirector";

export const appRouter = t.router({
  auth: authRouter,
  admin: adminRouter,
  candidate: candidateRouter,
  district: districtRouter,
  institution: institutionRouter,
  job: jobRouter,
  organization: organizationRouter,
  placementDirector: placementDirectorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
