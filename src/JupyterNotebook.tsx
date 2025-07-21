'use client'

import type { Notebook } from './types.ts';

// Components
import JupyterNotebookCodeCell from './JupyterNotebookCodeCell.tsx';
import JupyterNotebookMarkdownCell from './JupyterNotebookMarkdownCell.tsx';


type JupyterNotebookProps = {
    notebook: Notebook,

    wrapperClassName?: string,
    streamOutputClassName?: string,
    errorOutputClassName?: string,
}

export default function JupyterNotebook(props: JupyterNotebookProps) {
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column' }}
            className={props.wrapperClassName}
        >
            {props.notebook.cells.map((cell, i) => {
                if (cell.cell_type === 'code') return (
                    <JupyterNotebookCodeCell
                        cell={cell}
                        streamOutputClassName={props.streamOutputClassName}
                        errorOutputClassName={props.errorOutputClassName}
                        key={i}
                    />
                );

                if (cell.cell_type === 'markdown') return (
                    <JupyterNotebookMarkdownCell
                        cell={cell}
                        key={i}
                    />
                );

                return null;
            })}
        </div>
    )
}
