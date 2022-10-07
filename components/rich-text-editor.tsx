/*
 * rich-text-editor.tsx
 * Ian Kollipara
 * 2022-10-03
 * 
 * Rich Text Editor
 */

// Imports
import dynamic from "next/dynamic"

export default dynamic(() => import("@mantine/rte"), {
    ssr: false,
    loading: () => null,
})
