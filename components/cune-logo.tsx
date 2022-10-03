/*
 * cune-logo.tsx
 * Ian Kollipara
 * 2022-09-28
 *
 * CUNE Logo Element
 */

// Imports
import { Image, Text, createStyles } from "@mantine/core";
import { DefaultProps } from "@mantine/styles";
import type { Component } from "react";

interface CuneLogoProps extends DefaultProps { }

const CuneLogo = ({ className }: CuneLogoProps) => {
    return (
        <Image
            className={className}
            src="https://imgs.search.brave.com/eu5QFHU6_J20Vjkw9pKzWyApsIydudR0WI2RsDvgc6k/rs:fit:1080:1080:1/g:ce/aHR0cHM6Ly9waXRj/aGVuZ2luZWxpdmUu/YmxvYi5jb3JlLndp/bmRvd3MubmV0L2Rl/di9iYmY1ZWQxNS05/NjY3LTRkZTUtYTJh/Zi0yZjgyMmZhZWIx/NWYvMmJjODQ1ODct/OWI5OC00ZDZkLWFh/ZjgtNWNkMTQ1NjA2/NjUzLnBuZw"
        />
    );
};

export default CuneLogo;
