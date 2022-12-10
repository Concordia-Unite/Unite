import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { guarded } from "@server/guarded"
import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
    //
}));

export const getServerSideProps: GetServerSideProps = guarded([], async () => ({
    props: {}
}))

export default function UniversitiesMembers(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { classes } = useStyles();

    return <>
    Hello World
    </>
};