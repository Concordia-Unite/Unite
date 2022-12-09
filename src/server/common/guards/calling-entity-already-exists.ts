import { type Guard } from "@server/guarded";

export const assertCallingEntityAlreadyExists: Guard = async ({ ssg }) => {
  if (await ssg.callingEntity.getCurrent.fetch()) {
    return {
      didPass: false,
      redirect: {
        destination: "/calling-entities/dashboard",
      },
    };
  }

  return {
    didPass: true,
  };
};
