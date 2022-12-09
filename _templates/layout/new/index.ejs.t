---
to: src/layouts/<%= h.changeCase.pascal(name) %>Layout.tsx
---

import type { ReactNode } from 'react';
import Head from 'next/head';

interface Props {
    title: string;
    children: ReactNode
}

export function <%= Name %>Layout(props: Props) {

    return (
        <>
        <Head>
          <title>{props.title}</title>
        </Head>
        {props.children}
        </>
    )
}