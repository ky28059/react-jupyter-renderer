import { useState } from 'react';
import type { CodeCell, CodeCellOutput as CodeCellOutputData } from './types.ts';


type JupyterNotebookCodeCellProps = {
    cell: CodeCell
}

export default function JupyterNotebookCodeCell(props: JupyterNotebookCodeCellProps) {
    const [code, setCode] = useState(Array.isArray(props.cell.source) ? props.cell.source.join('') : props.cell.source);

    return (
        <div style={{ display: 'flex', gap: '0.5rem', position: 'relative', paddingLeft: '4rem' }}>
            <div
                style={{
                    fontFamily: 'monospace',
                    position: 'absolute',
                    left: 0,
                    width: '3.5rem',
                    textAlign: 'right'
                }}
            >
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

                {props.cell.outputs.map((output, i) => (
                    <CodeCellOutput output={output} key={i} />
                ))}
            </div>
        </div>
    )
}

function CodeCellOutput(props: { output: CodeCellOutputData }) {
    if (props.output.output_type === 'stream') return (
        <pre style={{ margin: '0.25rem 0.5rem' }}>
            {props.output.text}
        </pre>
    )

    if (props.output.output_type === 'error') return (
        <pre style={{ padding: '0.25rem 0.5rem', overflowX: 'auto', backgroundColor: 'rgb(255 0 0 / 0.2)' }}>
            {props.output.traceback.join('')}
        </pre>
    )

    return null;
}
