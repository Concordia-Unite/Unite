---
to: src/server/common/repositories/<%= h.changeCase.param(name) %>.ts
---

import type { PrismaClient } from "@prisma/client";


export class <%= Name %>Repo {

    public constructor(
        private client: PrismaClient
    ) {}


    // Define Access Methods here
}