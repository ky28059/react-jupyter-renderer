import type { ReactNode } from 'react';

// Components
import NotebookDemo from '@/app/NotebookDemo';
import ExternalLink from '@/components/ExternalLink';
import LinkHeading from '@/components/LinkHeading';
import InlineCode from '@/components/InlineCode';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';


export default function Home() {
    return (
        <main className="container py-20 mx-auto">
            <h1 className="-ml-2 text-4xl font-bold mb-3">
                @ky28059/react-jupyter-renderer
            </h1>
            <p className="mb-6">
                A fully-interactive Jupyter notebook renderer in React based on{' '}
                <ExternalLink href="https://pyodide.org/en/stable/">Pyodide</ExternalLink>{' '}
                and the <ExternalLink href="https://jupyter.org/try-jupyter/lab/">JupyterLite project</ExternalLink>.
            </p>

            <NotebookDemo />

            <LinkHeading id="installing" className="font-bold text-2xl mt-12 mb-3">
                Installing
            </LinkHeading>
            <p className="mb-4">
                This library uses <InlineCode>react-markdown</InlineCode> to render Markdown notebook cells. Due to
                bundling issues, however, <InlineCode>react-markdown</InlineCode> is listed as a peer dependency and
                must be installed separately.
            </p>
            <div className="rounded-lg overflow-hidden !text-sm">
                <SyntaxHighlighter language="bash">
                    npm i @ky28059/react-jupyter-renderer react-markdown
                </SyntaxHighlighter>
            </div>

            <LinkHeading id="usage" className="font-bold text-2xl mt-12 mb-3">
                Usage
            </LinkHeading>
            <p className="mb-4">
                For most use cases, render notebooks using the <InlineCode>{'<JupyterNotebook />'}</InlineCode> component:
            </p>
            <div className="rounded-lg overflow-hidden text-sm">
                <SyntaxHighlighter language="tsx">
                    {notebookExample}
                </SyntaxHighlighter>
            </div>
            <p className="my-4">
                For efficiency and customizability reasons, this library does not ship with any default component
                styles; instead, the appearance of notebooks can be controlled using the following props:
            </p>
            <PropsTable>
                <tr>
                    <TableCell><code>notebook</code></TableCell>
                    <TableCell><code>Notebook</code></TableCell>
                    <TableCell>
                        The Jupyter notebook to render. Note that to support the use case of embedding known / trusted
                        notebooks, the input notebook data <strong>is not sanitized or checked before rendering</strong>.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>trusted</code></TableCell>
                    <TableCell><code>boolean?</code></TableCell>
                    <TableCell>
                        Whether to render potentially dangerous (HTML) output. Again, to support embedding known / trusted
                        notebooks, this prop <strong>defaults to true</strong>.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>remarkPlugins</code></TableCell>
                    <TableCell><code>Pluggable[]?</code></TableCell>
                    <TableCell>
                        Plugins for <InlineCode>remark</InlineCode> to be passed to <InlineCode>react-markdown</InlineCode>.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>rehypePlugins</code></TableCell>
                    <TableCell><code>Pluggable[]?</code></TableCell>
                    <TableCell>
                        Plugins for <InlineCode>rehype</InlineCode> to be passed to <InlineCode>react-markdown</InlineCode>.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>wrapperClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to set on the wrapper <InlineCode>{'<div>'}</InlineCode>{' '}
                        element.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>markdownClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to set on markdown cells.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>codeCellClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to set on code cells. If this cell has been edited since
                        it was last executed, <InlineCode>data-edited="true"</InlineCode> will be set; similarly, if
                        this cell is currently selected, <InlineCode>data-active="true"</InlineCode> will be set.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>executionCountClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to set on the execution count element; this is a child
                        of the code cell element.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>runButtonClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to set on the run button element; this is a child
                        of the code cell element.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>codeEditorClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to pass to the <InlineCode>react-simple-code-editor</InlineCode>{' '}
                        code editor; this is a child of the code cell element.
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>streamOutputClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to set on "stream output" (e.g. <InlineCode>text/plain</InlineCode>{' '}
                        output, or prints to <InlineCode>stdout</InlineCode>).
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>errorOutputClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to set on "error output" (e.g. exception stack traces,
                        or prints to <InlineCode>stderr</InlineCode>).
                    </TableCell>
                </tr>
                <tr>
                    <TableCell><code>indicatorClassName</code></TableCell>
                    <TableCell><code>string?</code></TableCell>
                    <TableCell>
                        The <InlineCode>className</InlineCode> to set on the code cell "indicator", i.e. the blue or
                        orange bar on JupyterLite displayed on the currently active code cell. Since the indicator is
                        simply a <InlineCode>{'<div>'}</InlineCode> whose appearance is controlled via CSS, its behavior
                        is fully customizable. If this prop is not provided, the indicator will not be rendered.
                    </TableCell>
                </tr>
            </PropsTable>
        </main>
    );
}

function PropsTable(props: { children: ReactNode }) {
    return (
        <table className="w-full border border-black/20 table-fixed">
            <tbody>
            <tr className="bg-gray-100">
                <TableHeaderCell className="w-52">Prop</TableHeaderCell>
                <TableHeaderCell className="w-40">Type</TableHeaderCell>
                <TableHeaderCell className="w-full">Value</TableHeaderCell>
            </tr>
            {props.children}
            </tbody>
        </table>
    )
}

function TableHeaderCell(props: { children: ReactNode, className: string }) {
    return (
        <th className={'px-3 py-2 border border-black/15 text-sm font-bold ' + props.className}>
            {props.children}
        </th>
    )
}

function TableCell(props: { children: ReactNode }) {
    return (
        <td className="px-3 py-2 border border-black/15 text-sm text-pretty">
            {props.children}
        </td>
    )
}

const notebookExample = `import { JupyterNotebook } from '@ky28059/react-jupyter-renderer';

export default function App() {
    // const notebook = ...

    return (
        <JupyterNotebook
            notebook={notebook}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            wrapperClassName="py-6 h-[36rem] overflow-y-auto gap-4 text-sm"
            markdownClassName="markdown mb-4"
            codeCellClassName="group my-2"
            executionCountClassName="font-mono group-data-active:text-sky-600 group-data-edited:text-orange-400!"
            runButtonClassName="cursor-pointer text-right px-1"
            codeEditorClassName="border border-black/10 bg-[rgb(245_245_245)] [&>textarea]:focus:outline-sky-600"
            streamOutputClassName="mt-2 px-2 py-1 overflow-x-auto"
            errorOutputClassName="mt-2 px-2 py-1 overflow-x-auto bg-red-500/20"
            indicatorClassName="hidden group-data-active:block absolute left-1 w-2 rounded-xs h-full bg-sky-600 group-data-edited:bg-orange-400"
        />
    )
}`
