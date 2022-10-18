/**
 * signup.tsx
 * Ian Kollipara
 * 2022.10.17
 *
 * Sign Up Page
 */

import { Title } from "@mantine/core";
import type { NextPage } from "next";
import { DefaultLayout } from "../components/layouts/default";

const SignUp: NextPage = () => {
  return (
    <DefaultLayout>
      <Title align={'center'}>Sign Up</Title>
    </DefaultLayout>
  );
};

export default SignUp;
