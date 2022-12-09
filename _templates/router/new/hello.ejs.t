---
to: src/server/trpc/router/<%= name %>.ts
---
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const <%= name %>Router = router({
    //
});
