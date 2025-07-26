'use client'

import { useEffect, useState } from 'react';
import PyodideWorker from './pyodideWorker.mjs?worker&inline';

// Components
import JupyterNotebookCodeCell from './JupyterNotebookCodeCell';
import JupyterNotebookMarkdownCell from './JupyterNotebookMarkdownCell';

// Utils
import type { Notebook } from './types.ts';
import { sendAndReceiveResponse } from './pyodideWorkerClient';


type JupyterNotebookProps = {
    notebook: Notebook,

    wrapperClassName?: string,
    markdownClassName?: string,
    codeEditorClassName?: string,
    streamOutputClassName?: string,
    errorOutputClassName?: string,
}

export default function JupyterNotebook(props: JupyterNotebookProps) {
    const [/* pyodide */, /* setPyodide */] = useState<null>(null);

    useEffect(() => {
        async function loadPyodide() {
            const worker = new PyodideWorker();
            console.log(worker);

            console.log(await sendAndReceiveResponse(worker, {
                context: {},
                python: 'a = 5'
            }));
            console.log(await sendAndReceiveResponse(worker, {
                context: {},
                python: 'a'
            }));
        }

        void loadPyodide();
    }, []);

    return (
        <div
            style={{ position: 'relative' }}
            className={props.wrapperClassName}
        >
            {props.notebook.cells.map((cell, i) => {
                if (cell.cell_type === 'code') return (
                    <JupyterNotebookCodeCell
                        cell={cell}
                        codeEditorClassName={props.codeEditorClassName}
                        streamOutputClassName={props.streamOutputClassName}
                        errorOutputClassName={props.errorOutputClassName}
                        key={i}
                    />
                );

                if (cell.cell_type === 'markdown') return (
                    <JupyterNotebookMarkdownCell
                        cell={cell}
                        markdownClassName={props.markdownClassName}
                        key={i}
                    />
                );

                return null;
            })}
        </div>
    )
}
