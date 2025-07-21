import type { MarkdownCell } from './types.ts';
import Markdown from 'react-markdown';


type JupyterNotebookMarkdownCellProps = {
    cell: MarkdownCell,
    markdownClassName?: string,
}

export default function JupyterNotebookMarkdownCell(props: JupyterNotebookMarkdownCellProps) {
    const source = Array.isArray(props.cell.source) ? props.cell.source.join('') : props.cell.source;

    return (
        <div
            style={{ paddingLeft: '4rem' }}
            className={props.markdownClassName}
        >
            <Markdown>
                {source}
            </Markdown>
        </div>
    )
}
