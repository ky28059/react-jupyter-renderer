import { useState } from 'react';
import type { CodeCell } from './types.ts';


type JupyterNotebookCodeCellProps = {
    cell: CodeCell
}

export default function JupyterNotebookCodeCell(props: JupyterNotebookCodeCellProps) {
    const [code, setCode] = useState(Array.isArray(props.cell.source) ? props.cell.source.join('') : props.cell.source);

    return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ fontFamily: 'monospace', flex: 'none' }}>
                [{props.cell.execution_count ?? ' '}]:
            </div>
            <div style={{ width: '100%' }}>
                <pre
                    style={{
                        margin: 0,
                        background: '#eee',
                        width: '100%',
                        padding: '0.5rem 1rem',
                        boxSizing: 'border-box'
                    }}
                    contentEditable
                    onBlur={(e) => setCode(e.currentTarget.innerText)}
                >
                {code}
            </pre>
            </div>
        </div>
    )
}
