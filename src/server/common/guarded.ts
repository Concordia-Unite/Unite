import {
  type GetServerSidePropsContext,
  type GetServerSidePropsResult,
  type GetServerSideProps,
} from "next";
import { z } from "zod";
import { getTRPCServerProxy, type TRPCServerProxy } from "./get-trpc-ssg";

const guardResultParser = z.discriminatedUnion("didPass", [
  z.object({ didPass: z.literal(true) }),
  z.object({
    didPass: z.literal(false),
    redirect: z.object({
      destination: z.string(),
    }),
  }),
]);

export type GuardResult = z.infer<typeof guardResultParser>;
export type Guard = (arg0: { ssg: TRPCServerProxy }) => Promise<GuardResult>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const guarded = <T extends { [key: string]: any }>(
  guards: Guard[],
  f: (arg0: {
    ctx: GetServerSidePropsContext;
    ssg: TRPCServerProxy;
  }) => Promise<GetServerSidePropsResult<T>>
): GetServerSideProps => {
  return async (ctx) => {
    const ssg = await getTRPCServerProxy(ctx);
    for (const guard of guards) {
      const result = await guard({ ssg });
      if (!result.didPass) {
        return {
          redirect: { ...result.redirect, permanent: false },
          props: {},
        };
      }
    }

    return await f({ ctx, ssg });
  };
};
