import type { Metadata } from 'next';
import EmbedContent from '@/app/embed/EmbedContent';


export const metadata: Metadata = {
    title: 'Embed',
    // description: 'Embed [...]',
};

export default function Embed() {
    return <EmbedContent />
}
