import type { NotebookCell } from './types.ts';


type JupyterNotebookCellProps = {
    cell: NotebookCell
}

export default function JupyterNotebookCell(props: JupyterNotebookCellProps) {
    if (props.cell.cell_type === 'code') {
        return <div>code</div>
    }

    if (props.cell.cell_type === 'markdown') {
        return <div>markdown</div>
    }

    return null;
}
