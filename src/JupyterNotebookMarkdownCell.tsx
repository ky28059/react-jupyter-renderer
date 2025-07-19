import type { MarkdownCell } from './types.ts';


type JupyterNotebookMarkdownCellProps = {
    cell: MarkdownCell
}

export default function JupyterNotebookMarkdownCell(props: JupyterNotebookMarkdownCellProps) {
    const source = Array.isArray(props.cell.source) ? props.cell.source.join('') : props.cell.source;

    return (
        <div style={{ paddingLeft: '4rem' }}>
            <pre>
                {source}
            </pre>
        </div>
    )
}
