import type { ReactNode } from 'react';


export default function InlineCode(props: { children: ReactNode }) {
    return (
        <code className="text-primary bg-black/10 text-[0.875em] rounded px-1.5 py-1">
            {props.children}
        </code>
    )
}
