'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { JupyterNotebook, Notebook } from '@ky28059/react-jupyter-renderer';

// Plugins
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';


export default function EmbedContent() {
    const params = useSearchParams();
    const url = params.get('url');

    const [notebook, setNotebook] = useState<Notebook | null>(null);

    useEffect(() => {
        if (!url) return;
        fetch(url).then(r => r.json()).then(d => setNotebook(d));
    }, [url]);

    if (!url) return (
        <div>
            no notebook URL entered ...
        </div>
    )

    return notebook === null ? (
        <div>
            loading ...
        </div>
    ) : (
        <JupyterNotebook
            notebook={notebook}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            wrapperClassName="container py-6 gap-4 text-sm"
            markdownClassName="markdown mb-4"
            codeCellClassName="group my-2"
            executionCountClassName="font-mono group-data-active:text-sky-600 group-data-edited:text-orange-400!"
            runButtonClassName="cursor-pointer text-right px-1"
            codeEditorClassName="border border-black/10 bg-[rgb(245_245_245)] [&>textarea]:focus:outline-sky-600"
            streamOutputClassName="mt-2 px-2 py-1 overflow-x-auto"
            errorOutputClassName="mt-2 px-2 py-1 overflow-x-auto bg-red-500/20"
            indicatorClassName="hidden group-data-active:block absolute left-1 w-2 rounded-xs h-full bg-sky-600 group-data-edited:bg-orange-400"
        />
    )
}
