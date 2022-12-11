import { router } from "../trpc";
import { authRouter } from "./auth";
import { callingEntityRouter } from "./calling-entity";
import { candidateRouter } from "./candidate";
import { districtRouter } from "./district";
import { placementRequestRouter } from "./placement-request";
import { universityRouter } from "./university";

export const appRouter = router({
  auth: authRouter,
  callingEntity: callingEntityRouter,
  candidate: candidateRouter,
  district: districtRouter,
  university: universityRouter,
  placementRequest: placementRequestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
