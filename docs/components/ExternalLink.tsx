import type { ReactNode } from 'react';


type ExternalLinkProps = {
    href: string,
    children: ReactNode
}

export default function ExternalLink(props: ExternalLinkProps) {
    return (
        <a
            className="text-blue-600 hover:underline"
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.children}
        </a>
    );
}
