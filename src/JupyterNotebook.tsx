'use client'

import { useEffect, useState } from 'react';
import PyodideWorker from './pyodideWorker.mjs?worker&inline';

// Components
import JupyterNotebookCodeCell from './JupyterNotebookCodeCell';
import JupyterNotebookMarkdownCell from './JupyterNotebookMarkdownCell';

// Utils
import type { Notebook } from './types.ts';


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

            worker.addEventListener('message', (e) => {
                console.log(e.data);
            });

            worker.postMessage({ id: 1, python: 'a = 5' });
            worker.postMessage({ id: 2, python: 'a' });
            worker.postMessage({ id: 3, python: 'print(a)' });
            worker.postMessage({ id: 4, python: '7' });
            worker.postMessage({ id: 4.5, python: 'import numpy as np\nimport matplotlib.pyplot as plt\nx = np.linspace(0, 10, 1000)\nplt.plot(x, np.sin(x));' });
            worker.postMessage({ id: 5, python: 'print(9)' });
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
