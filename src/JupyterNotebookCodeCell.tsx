import { useState } from 'react';
import type { CodeCell, CodeCellOutput as CodeCellOutputData } from './types.ts';


type JupyterNotebookCodeCellProps = {
    cell: CodeCell,

    streamOutputClassName?: string,
    errorOutputClassName?: string,
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
                    <CodeCellOutput
                        output={output}
                        streamOutputClassName={props.streamOutputClassName}
                        errorOutputClassName={props.errorOutputClassName}
                        key={i}
                    />
                ))}
            </div>
        </div>
    )
}

type CodeCellOutputProps = {
    output: CodeCellOutputData,
    streamOutputClassName?: string,
    errorOutputClassName?: string,
}

function CodeCellOutput(props: CodeCellOutputProps) {
    if (props.output.output_type === 'stream') return props.output.name === 'stdout' ? (
        <pre className={props.streamOutputClassName}>
            {props.output.text}
        </pre>
    ) : (
        <pre className={props.errorOutputClassName}>
            {props.output.text}
        </pre>
    )

    if (props.output.output_type === 'error') return (
        <pre className={props.errorOutputClassName}>
            {props.output.traceback.join('')}
        </pre>
    )

    if (props.output.output_type === 'execute_result' || props.output.output_type === 'display_data') {
        const mimes = props.output.data;

        // Image output
        if (mimes['image/png']) return (
            <img
                src={`data:image/png;base64,${mimes['image/png']}`}
                alt={mimes['text/plain']}
            />
        )

        // Fall back to `text/plain` output
        if (mimes['text/plain']) return (
            <pre className={props.streamOutputClassName}>
                {mimes['text/plain']}
            </pre>
        )

        return null;
    }

    return null;
}
