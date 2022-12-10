import { type Guard } from "@server/guarded";

export const assertMemberOfDistrict: Guard = async ({ ssg }) => {
  try {
    if (!(await ssg.district.getCurrent.fetch())) {
      return {
        didPass: false,
        redirect: { destination: "/candidates/me" },
      };
    }
  } catch {
    return {
      didPass: false,
      redirect: { destination: "/login" },
    };
  }

  return { didPass: true };
};
