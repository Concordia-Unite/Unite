import { trpc } from "@services/trpc";

export function useDistricts() {
  const { data: districts, status } = trpc.district.getAll.useQuery();

  return { districts, status };
}
