---
to: src/pages/<%= name %>.tsx
---

import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { guarded } from "@server/guarded"
import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
    //
}));

export const getServerSideProps: GetServerSideProps = guarded([], () => ({
    props: {}
}))

export default function <%= h.changeCase.pascal(Name.replaceAll("/", "-")) %>(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { classes } = useStyles();

    return <>
    Hello World
    </>
};