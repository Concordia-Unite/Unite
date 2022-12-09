import type { TRPCSSGProxy } from "@services/trpc";

interface HasCallingEntityArgs {
  ssg: TRPCSSGProxy;
}

export async function assertHasCallingEntity(args: HasCallingEntityArgs) {
  try {
    if (!(await args.ssg.callingEntity.getCurrent.fetch())) {
      return {
        redirect: {
          destination: "/calling-entities/create",
        },
        props: {},
      };
    }
  } catch {
    return {
      redirect: {
        destination: "/login",
      },
      props: {},
    };
  }
}
