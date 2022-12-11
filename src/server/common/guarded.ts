/**
 * guarded.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Guard Wrapper
 */

// Imports
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetServerSideProps,
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

/**
 * guarded allows guards to be declaratively applied to a server rendering process.
 * Guards must implement the Guard type. They are invoked in the order provided, and
 * are handled in that order as well. The provided function is the "happy path", where
 * if all the guards pass, it should do this.
 * @param guards A List of Guards to apply
 * @param f The "happy path" function
 * @returns A GetServerSideProps compatible function
 */
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
