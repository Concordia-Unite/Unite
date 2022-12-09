---
to: src/server/common/guards/<%= name %>.ts
---

interface <%= h.changeCase.pascal(name) %>Args {}

export function assert<%= h.changeCase.pascal(name) %>(args: <%= h.changeCase.pascal(name) %>Args) {}