import dynamic from "next/dynamic";
import { LoadingOverlay } from "@mantine/core";

export default dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: ({ isLoading }) => <LoadingOverlay visible={isLoading ?? false} />,
});
