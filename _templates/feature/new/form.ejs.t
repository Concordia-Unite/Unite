---
to: src/features/<%= feature %>/lib/<%= name %>-form.ts
---
import { z } from "zod";


export const <%= name %>Validator = z.object({
    //
})

export type <%= Name %> = z.infer<typeof <%= name %>Validator %>>