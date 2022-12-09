import { type Guard } from "@server/guarded";

export const assertCandidateDoesExist: Guard = async ({ ssg }) => {
  if (!(await ssg.candidate.getCurrent.fetch())) {
    return {
      didPass: false,
      redirect: {
        destination: "/candidates/create",
      },
    };
  }

  return { didPass: true };
};
