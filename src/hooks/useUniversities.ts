import { trpc } from "@services/trpc";

export function useUniversities() {
  const { data: universities, status } = trpc.university.getAll.useQuery();

  return { universities, status };
}
