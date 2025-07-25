'use client'

import type { Notebook } from './types.ts';

// Components
import JupyterNotebookCodeCell from './JupyterNotebookCodeCell.tsx';
import JupyterNotebookMarkdownCell from './JupyterNotebookMarkdownCell.tsx';


type JupyterNotebookProps = {
    notebook: Notebook,

    wrapperClassName?: string,
    markdownClassName?: string,
    codeEditorClassName?: string,
    streamOutputClassName?: string,
    errorOutputClassName?: string,
}

export default function JupyterNotebook(props: JupyterNotebookProps) {
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
