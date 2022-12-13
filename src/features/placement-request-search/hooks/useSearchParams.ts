import type { UseFormReturnType } from "@mantine/form";
import type {
  CallingEntity,
  District,
  Grade,
  PlacementRequest,
} from "@prisma/client";
import { useCallback } from "react";
import type { Search } from "../lib/search-form";

interface UseSearchParamsArgs {
  form: UseFormReturnType<Search>;
  requests: (PlacementRequest & {
    requestee: CallingEntity & {
      district: District;
    };
    grades: Grade[];
  })[];
}

export function useSearchParams(args: UseSearchParamsArgs) {
  return useCallback(() => {
    let requests = args.requests;
    if (args.form.values.districtId)
      requests = requests.filter(
        (request) =>
          request.requestee.districtId === args.form.values.districtId
      );
    if (args.form.values.position)
      requests = requests.filter(
        (request) =>
          request.positionPosition === args.form.values.position?.valueOf()
      );
    if (args.form.values.region)
      requests = requests.filter(
        (request) =>
          request.requestee.district.region ===
          args.form.values.region?.valueOf()
      );
    if (args.form.values.variant)
      requests = requests.filter(
        (request) =>
          request.requestee.variant === args.form.values.variant?.valueOf()
      );

    return requests;
  }, [args.form, args.requests]);
}
