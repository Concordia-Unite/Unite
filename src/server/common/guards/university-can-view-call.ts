import { type Guard } from "@server/guarded";

export const assertUniversityCanViewCall: Guard = async ({ ssg, ctx }) => {
  const currentUniversity = await ssg.university.getCurrent.fetch();
  const currentCall = await ssg.call.getById.fetch({
    id: Number(ctx.params?.id),
  });
  if (currentCall?.candidate.universityId !== currentUniversity?.id) {
    return {
      didPass: false,
      redirect: { destination: "/universities/calls" },
    };
  }
  return {
    didPass: true,
  };
};
