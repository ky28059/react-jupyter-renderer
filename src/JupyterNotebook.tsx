import type { Notebook } from './types.ts';
import JupyterNotebookCell from './JupyterNotebookCell.tsx';


type JupyterNotebookProps = {
    notebook: Notebook,
}

export default function JupyterNotebook(props: JupyterNotebookProps) {
    return (
        <div>
            {props.notebook.cells.map((cell) => (
                <JupyterNotebookCell
                    cell={cell}
                    key={cell.id}
                />
            ))}
        </div>
    )
}
