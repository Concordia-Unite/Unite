---
to: src/pages/<%= parent || '' %>/<%= name %>.tsx
---

import type { GetServerSideProps, InferGetServerSideProps } from "next"
import { createStyles } from "@mantine/core"


export const getServerSideProps: GetServerSideProps = async (context) => {
    //
}


export default function <%= Name %>(props: InferGetServerSideProps<typeof getServerSideProps>) {

    return <>
    Hello World
    <>
};