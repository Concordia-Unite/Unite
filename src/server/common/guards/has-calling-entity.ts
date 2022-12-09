import { type Guard } from "@server/guarded";

export const assertHasCallingEntity: Guard = async ({ ssg }) => {
  try {
    if (!(await ssg.callingEntity.getCurrent.fetch())) {
      return {
        didPass: false,
        redirect: {
          destination: "/calling-entities/create",
        },
      };
    }
  } catch {
    return {
      didPass: false,
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    didPass: true,
  };
};
