import { type Guard } from "@server/guarded";

export const assertCandidateAlreadyExists: Guard = async ({ ssg }) => {
  if (await ssg.candidate.getCurrent.fetch()) {
    return {
      didPass: false,
      redirect: {
        destination: "/candidates/me",
      },
    };
  }

  return {
    didPass: true,
  };
};
