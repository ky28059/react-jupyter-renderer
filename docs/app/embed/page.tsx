import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmbedContent from '@/app/embed/EmbedContent';


export const metadata: Metadata = {
    title: 'Embed',
    // description: 'Embed [...]',
};

export default function Embed() {
    return (
        <Suspense>
            <EmbedContent />
        </Suspense>
    )
}
