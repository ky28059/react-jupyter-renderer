'use client'

import { ReactNode, useState } from 'react';
import { JupyterNotebook } from '@ky28059/react-jupyter-renderer';
import { folium, lorenz, matplotlib } from '@/app/notebooks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


const notebooks = [matplotlib, lorenz, folium];
const names = ['matplotlib.ipynb', 'Lorenz.ipynb', 'folium.ipynb'];

export default function NotebookDemo() {
    const [selected, setSelected] = useState(0);

    return (
        <div className="border border-black/20 rounded-lg shadow-xl overflow-hidden">
            <div className="flex border-b border-black/20 bg-gray-100">
                {names.map((name, i) => (
                    <NotebookTab
                        key={i}
                        index={i}
                        selected={selected}
                        setSelected={setSelected}
                    >
                        {name}
                    </NotebookTab>
                ))}
            </div>
            {notebooks.map((notebook, i) => (
                <JupyterNotebook
                    key={i}
                    notebook={notebook}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    wrapperClassName={'py-6 h-[36rem] overflow-y-auto gap-4 text-sm' + (selected !== i ? ' hidden' : '')}
                    markdownClassName="markdown mb-4"
                    codeCellClassName="group my-2"
                    executionCountClassName="font-mono group-data-active:text-sky-600 group-data-edited:text-orange-400!"
                    runButtonClassName="cursor-pointer text-right px-1"
                    codeEditorClassName="border border-black/10 bg-[rgb(245_245_245)] [&>textarea]:focus:outline-sky-600"
                    streamOutputClassName="mt-2 px-2 py-1 overflow-x-auto"
                    errorOutputClassName="mt-2 px-2 py-1 overflow-x-auto bg-red-500/20"
                    indicatorClassName="hidden group-data-active:block absolute left-1 w-2 rounded-xs h-full bg-sky-600 group-data-edited:bg-orange-400"
                />
            ))}
        </div>
    )
}

type NotebookTabProps = {
    index: number,
    selected: number,
    setSelected: (index: number) => void,
    children: ReactNode
}

function NotebookTab(props: NotebookTabProps) {
    const active = props.index === props.selected;

    return (
        <button
            className={'cursor-pointer px-3 py-1 text-sm border-t-2 ' + (active ? 'bg-white border-b border-b-white border-x border-black/20 -mb-px border-t-sky-600' : 'border-t-transparent')}
            onClick={() => props.setSelected(props.index)}
        >
            {props.children}
        </button>
    );
}
