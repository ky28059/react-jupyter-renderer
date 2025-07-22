import type { MarkdownCell } from './types.ts';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


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
            <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
            >
                {source}
            </Markdown>
        </div>
    )
}
