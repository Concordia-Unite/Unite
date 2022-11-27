import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { universityRouter } from "./university";
import { districtRouter } from "./district";
import { candidateRouter } from "./candidate";
import { callingEntityRouter } from "./callingEntity";
import { placementRequestRouter } from "./placementRequest";
import { subjectRouter } from "./subject";
import { gradeRouter } from "./grade";
import "../../../utils/superjson";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  university: universityRouter,
  district: districtRouter,
  candidate: candidateRouter,
  callingEntity: callingEntityRouter,
  placementRequest: placementRequestRouter,
  subject: subjectRouter,
  grade: gradeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
