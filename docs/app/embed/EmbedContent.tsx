'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { JupyterNotebook, Notebook } from '@ky28059/react-jupyter-renderer';

// Components
import EmbedInput from '@/app/embed/EmbedInput';
import Spinner from '@/components/Spinner';

// Plugins
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';


export default function EmbedContent() {
    const params = useSearchParams();
    const url = params.get('url');

    const [notebook, setNotebook] = useState<Notebook | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) return;
        fetch(url)
            .then(r => r.json())
            .then(d => setNotebook(d))
            .catch(e => setError(`Error fetching notebook: ${e}`));
    }, [url]);

    if (!url) return <EmbedInput />

    return error ? (
        <div className="w-full h-screen bg-red-500/25 text-red-600 flex items-center justify-center text-sm">
            {error}
        </div>
    ) : notebook === null ? (
        <div className="w-full h-screen flex items-center justify-center">
            <Spinner />
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
