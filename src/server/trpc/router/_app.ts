import { router } from "../trpc";
import { authRouter } from "./auth";
import { candidateRouter } from "./candidate";
import { districtRouter } from "./district";
import { universityRouter } from "./university";

export const appRouter = router({
  auth: authRouter,
  candidate: candidateRouter,
  district: districtRouter,
  university: universityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
