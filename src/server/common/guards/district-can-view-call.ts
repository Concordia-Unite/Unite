import { type Guard } from "@server/guarded";

export const assertDistrictCanViewCall: Guard = async ({ ssg, ctx }) => {
  const currentDistrict = await ssg.district.getCurrent.fetch();
  const currentCall = await ssg.call.getById.fetch({
    id: Number(ctx.params?.id),
  });
  if (currentCall?.candidate.districtId !== currentDistrict?.id) {
    return {
      didPass: false,
      redirect: { destination: "/districts/calls" },
    };
  }
  return {
    didPass: true,
  };
};
