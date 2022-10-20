/**
 * rte.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Rich Text Editor (built off Quill.js)
 */

import dynamic from "next/dynamic";

export default dynamic(() => import("@mantine/rte"), {
  ssr: false,

  loading: () => null,
});
