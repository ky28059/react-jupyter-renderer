import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.27.6/full/pyodide.mjs";


const pipliteWheelUrl = 'https://jupyter.org/try-jupyter/extensions/@jupyterlite/pyodide-kernel-extension/static/pypi/piplite-0.6.0-py3-none-any.whl'
const pipliteUrls = [
    'https://jupyter.org/try-jupyter/extensions/@jupyterlite/pyodide-kernel-extension/static/pypi/all.json'
    // 'https://jupyter.org/try-jupyter/extensions/@jupyterlite/pyodide-kernel-extension/static/pypi/ipykernel-6.9.2-py3-none-any.whl',
    // 'https://jupyter.org/try-jupyter/extensions/@jupyterlite/pyodide-kernel-extension/static/pypi/pyodide_kernel-0.6.0-py3-none-any.whl',
    // 'https://jupyter.org/try-jupyter/extensions/@jupyterlite/pyodide-kernel-extension/static/pypi/widgetsnbextension-3.6.999-py3-none-any.whl',
    // 'https://jupyter.org/try-jupyter/extensions/@jupyterlite/pyodide-kernel-extension/static/pypi/widgetsnbextension-4.0.999-py3-none-any.whl'
]


class PyodideWorker {
    constructor() {
        this.initialized = this.initialize();
    }

    async initialize() {
        this.pyodide = await loadPyodide();

        await this.pyodide.loadPackage(['micropip', 'jedi', 'ipython']);
        await this.pyodide.runPythonAsync(`
            import micropip
            await micropip.install('${pipliteWheelUrl}', keep_going=True)
        `);
        await this.pyodide.runPythonAsync(`
            import piplite.piplite
            piplite.piplite._PIPLITE_DISABLE_PYPI = False
            piplite.piplite._PIPLITE_URLS = ${JSON.stringify(pipliteUrls)}
        `);

        const scriptLines = [];
        for (const pkg of [/* 'ssl', 'sqlite3', */ 'ipykernel', 'comm', 'pyodide_kernel']) {
            scriptLines.push(`await piplite.install('${pkg}', keep_going=True)`);
        }

        scriptLines.push('import pyodide_kernel');
        await this.pyodide.runPythonAsync(scriptLines.join('\n'));

        const { globals } = this.pyodide;
        this.kernel = globals.get('pyodide_kernel').kernel_instance.copy();
        this.stdout_stream = globals.get('pyodide_kernel').stdout_stream.copy();
        this.stderr_stream = globals.get('pyodide_kernel').stderr_stream.copy();
        this.interpreter = this.kernel.interpreter.copy();
        // this.interpreter.send_comm = this.sendComm.bind(this);
    }

    mapToObject(obj) {
        const out = obj instanceof Array ? [] : {};
        obj.forEach((value, key) => {
            out[key] = value instanceof Map || value instanceof Array
                ? this.mapToObject(value)
                : value;
        });
        return out;
    }

    formatResult(res) {
        if (!(res instanceof this.pyodide.ffi.PyProxy)) {
            return res;
        }
        const m = res.toJs();
        return this.mapToObject(m);
    }

    async execute(id, content) {
        // TODO?
        await this.pyodide.loadPackagesFromImports(content);

        const publishExecutionResult = (prompt_count, data, metadata) => {
            self.postMessage({
                id,
                type: 'execute_result',
                execution_count: prompt_count,
                data: this.formatResult(data),
                metadata: this.formatResult(metadata),
            });
        };

        const publishExecutionError = (ename, evalue, traceback) => {
            self.postMessage({
                id,
                type: 'execute_error',
                ename: ename,
                evalue: evalue,
                traceback: traceback,
            });
        };

        const clearOutputCallback = (wait) => {
            self.postMessage({
                id,
                type: 'clear_output',
                wait: this.formatResult(wait),
            });
        };

        const displayDataCallback = (data, metadata, transient) => {
            self.postMessage({
                id,
                type: 'display_data',
                data: this.formatResult(data),
                metadata: this.formatResult(metadata),
                transient: this.formatResult(transient),
            });
        };

        const updateDisplayDataCallback = (data, metadata, transient) => {
            self.postMessage({
                id,
                type: 'update_display_data',
                data: this.formatResult(data),
                metadata: this.formatResult(metadata),
                transient: this.formatResult(transient),
            });
        };

        const publishStreamCallback = (name, text) => {
            self.postMessage({
                id,
                type: 'stream',
                name: this.formatResult(name),
                text: this.formatResult(text),
            });
        };

        this.stdout_stream.publish_stream_callback = publishStreamCallback;
        this.stderr_stream.publish_stream_callback = publishStreamCallback;
        this.interpreter.display_pub.clear_output_callback = clearOutputCallback;
        this.interpreter.display_pub.display_data_callback = displayDataCallback;
        this.interpreter.display_pub.update_display_data_callback = updateDisplayDataCallback;
        this.interpreter.displayhook.publish_execution_result = publishExecutionResult;
        // this.interpreter.input = this.input.bind(this);
        // this.interpreter.getpass = this.getpass.bind(this);

        const res = await this.kernel.run(content);
        const results = this.formatResult(res);

        if (results['status'] === 'error') {
            publishExecutionError(results['ename'], results['evalue'], results['traceback']);
        }

        return results;
    }
}


const worker = new PyodideWorker();

self.onmessage = async (event) => {
    // Ensure initialization is complete
    await worker.initialized;

    const { id, python } = event.data;
    await worker.execute(id, python);
};
