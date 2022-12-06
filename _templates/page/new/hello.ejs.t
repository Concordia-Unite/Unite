---
to: src/pages/<%= name %>.tsx
---

import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
    //
}));

export const getServerSideProps: GetServerSideProps = async (context) => {
    //
}


export default function <%= Name %>(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { classes } = useStyles();

    return <>
    Hello World
    <>
};