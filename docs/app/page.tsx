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
        </main>
    );
}
