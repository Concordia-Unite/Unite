import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  //
}));

export const getServerSideProps: GetServerSideProps = async (context) => {
  //
};

export default function Create(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { classes } = useStyles();

  return <>Hello World</>;
}
