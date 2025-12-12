# react-jupyter-renderer
Simple React library for rendering interactive Jupyter notebooks in the web.

You can install and use this library in your own projects via
```bash
npm i @ky28059/react-jupyter-renderer react-markdown
```
or view a hosted notebook previewer using `react-jupyter-renderer` here: https://react-jupyter-renderer.kevin.fish/embed

### Motivation
While many libraries exist to render Jupyter Notebooks as static HTML for embedding on websites, and many other web
editors exist for Jupyter Notebooks, there hasn't been a library able to embed *dynamic* (editable and runnable)
notebooks on the web.

This project, based on [JupyterLite](https://jupyter.org/try-jupyter/lab/), uses web workers and [Pyodide](https://pyodide.org/en/stable/)
to allow for dynamic embedding of arbitrary Jupyter Notebooks.

See [react-jupyter-renderer.kevin.fish](https://react-jupyter-renderer.kevin.fish/) for detailed documentation and examples.

```tsx
import { JupyterNotebook } from '@ky28059/react-jupyter-renderer';

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
}
```
