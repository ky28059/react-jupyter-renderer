import type { Notebook } from './types.ts';
import JupyterNotebookCodeCell from './JupyterNotebookCodeCell.tsx';


type JupyterNotebookProps = {
    notebook: Notebook,
}

export default function JupyterNotebook(props: JupyterNotebookProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {props.notebook.cells.map((cell, i) => {
                if (cell.cell_type === 'code') return (
                    <JupyterNotebookCodeCell
                        cell={cell}
                        key={i}
                    />
                );

                return null;
            })}
        </div>
    )
}
