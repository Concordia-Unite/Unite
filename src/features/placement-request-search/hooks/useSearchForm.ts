import { createFormContext } from "@mantine/form";
import type { Search } from "../lib/search-form";

export const [, , useSearchForm] = createFormContext<Search>();
