---
sh: mkdir -p src/features/<%= h.changeCase.param(name) %>/{hooks,components,lib} && touch /src/features/<%= h.changeCase.param(name) %>/index.ts
---