---
to: src/server/common/guards/<%= name %>.ts
---

import { type Guard } from "@server/guarded"

export const assert<%= h.changeCase.pascal(name) %>: Guard = async ({ ssg }) => {
    return {
        didPass: true
    }
}