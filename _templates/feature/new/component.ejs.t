---
to: src/features/<%= h.changeCase.param(feature) %>/<%= h.changeCase.pascal(name) %>.tsx
---
import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => {
    //
});

interface Props {

};

export function <%= h.changeCase.pascal(name) %>(props: Props) {
    return <>
    Hello World
    </>
};