import { PlacementRequestStatus } from "@enums/placement-request-status";
import { type Guard } from "@server/guarded";

export const assertApprovedForCandidate: Guard = async ({ ssg, ctx }) => {
  try {
    const currentRequest = await ssg.placementRequest.getById.fetch({
      id: Number(ctx.params?.id ?? -1),
    });
    const currentCandidate = await ssg.candidate.getCurrent.fetch();

    if (currentCandidate?.district) {
      if (
        !(
          currentRequest?.districtPlacementRequest?.status ===
          PlacementRequestStatus.Approved
        )
      )
        return {
          didPass: false,
          redirect: { destination: "/candidates/me" },
        };
      if (
        !(
          currentRequest?.districtPlacementRequest?.districtId ===
          currentCandidate.districtId
        )
      )
        return {
          didPass: false,
          redirect: { destination: "/candidates/me" },
        };
    } else {
      if (
        !(
          currentRequest?.districtPlacementRequest?.status ===
          PlacementRequestStatus.Approved
        )
      )
        return {
          didPass: false,
          redirect: { destination: "/candidates/me" },
        };
      if (
        !currentRequest.universityPlacementRequests.filter(
          (uniReq) => uniReq.universityId === currentCandidate?.universityId
        ).length
      )
        return {
          didPass: false,
          redirect: { destination: "/candidates/me" },
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
