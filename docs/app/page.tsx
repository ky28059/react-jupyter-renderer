import { JupyterNotebook } from '@ky28059/react-jupyter-renderer';
import { lorenz } from '@/app/notebooks';


export default function Home() {
    return (
        <main className="container py-20 px-16 mx-auto">
            <h1 className="-ml-2 text-4xl font-bold mb-3">
                @ky28059/react-jupyter-renderer
            </h1>
            <p className="mb-6">
                An interactive Jupyter notebook renderer in React based on [...]
            </p>

            <JupyterNotebook
                notebook={lorenz}
                wrapperClassName="py-6 border border-black/20 rounded-lg h-[36rem] overflow-y-auto gap-4 text-sm shadow-xl"
                markdownClassName="markdown mb-4"
                codeEditorClassName="mb-2 border border-black/10 bg-[rgb(245_245_245)]"
                streamOutputClassName="mt-2 px-2 py-1 overflow-x-auto"
                errorOutputClassName="mt-2 px-2 py-1 overflow-x-auto bg-red-500/20"
            />
        </main>
    );
}

const notebook = {
    "metadata": {
        "kernelspec": {
            "display_name": "Python (Pyodide)",
            "language": "python",
            "name": "python"
        },
        "language_info": {
            "codemirror_mode": {
                "name": "python",
                "version": 3
            },
            "file_extension": ".py",
            "mimetype": "text/x-python",
            "name": "python",
            "nbconvert_exporter": "python",
            "pygments_lexer": "ipython3",
            "version": "3.8"
        }
    },
    "nbformat_minor": 5,
    "nbformat": 4,
    "cells": [
        {
            "id": "a35eeb9f-df70-4ab1-a243-2d2025888eb0",
            "cell_type": "markdown",
            "source": "# Introduction to the JupyterLab and Jupyter Notebooks\n\nThis is a short introduction to two of the flagship tools created by [the Jupyter Community](https://jupyter.org).\n\n> **⚠️Experimental!⚠️**: This is an experimental interface provided by the [JupyterLite project](https://jupyterlite.readthedocs.io/en/latest/). It embeds an entire JupyterLab interface, with many popular packages for scientific computing, in your browser. There may be minor differences in behavior between JupyterLite and the JupyterLab you install locally. You may also encounter some bugs or unexpected behavior. To report any issues, or to get involved with the JupyterLite project, see [the JupyterLite repository](https://github.com/jupyterlite/jupyterlite/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).\n\n## JupyterLab 🧪\n\n**JupyterLab** is a next-generation web-based user interface for Project Jupyter. It enables you to work with documents and activities such as Jupyter notebooks, text editors, terminals, and custom components in a flexible, integrated, and extensible manner. It is the interface that you're looking at right now.\n\n**For an overview of the JupyterLab interface**, see the **JupyterLab Welcome Tour** on this page, by going to `Help -> Welcome Tour` and following the prompts.\n\n> **See Also**: For a more in-depth tour of JupyterLab with a full environment that runs in the cloud, see [the JupyterLab introduction on Binder](https://mybinder.org/v2/gh/jupyterlab/jupyterlab-demo/HEAD?urlpath=lab/tree/demo).\n\n## Jupyter Notebooks 📓\n\n**Jupyter Notebooks** are a community standard for communicating and performing interactive computing. They are a document that blends computations, outputs, explanatory text, mathematics, images, and rich media representations of objects.\n\nJupyterLab is one interface used to create and interact with Jupyter Notebooks.\n\n**For an overview of Jupyter Notebooks**, see the **JupyterLab Welcome Tour** on this page, by going to `Help -> Notebook Tour` and following the prompts.\n\n> **See Also**: For a more in-depth tour of Jupyter Notebooks and the Classic Jupyter Notebook interface, see [the Jupyter Notebook IPython tutorial on Binder](https://mybinder.org/v2/gh/ipython/ipython-in-depth/HEAD?urlpath=tree/binder/Index.ipynb).\n\n## An example: visualizing data in the notebook ✨\n\nBelow is an example of a code cell. We'll visualize some simple data using two popular packages in Python. We'll use [NumPy](https://numpy.org/) to create some random data, and [Matplotlib](https://matplotlib.org) to visualize it.\n\nNote how the code and the results of running the code are bundled together.",
            "metadata": {}
        },
        {
            "id": "5ba26c46-fd0b-4484-b663-ae7c312f307a",
            "cell_type": "code",
            "source": "a = 1",
            "metadata": {
                "trusted": true
            },
            "outputs": [],
            "execution_count": 10
        },
        {
            "id": "fe55883a-6887-43dd-9498-5333a51799e2",
            "cell_type": "code",
            "source": "print(a)\na = 5",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "name": "stdout",
                    "output_type": "stream",
                    "text": "1\n"
                }
            ],
            "execution_count": 11
        },
        {
            "id": "97f3f0ce-a346-4bdb-b00a-d11631ef2b1a",
            "cell_type": "code",
            "source": "print(a)\na = 3",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "name": "stdout",
                    "output_type": "stream",
                    "text": "5\n"
                }
            ],
            "execution_count": 12
        },
        {
            "id": "9aae024b-619f-491f-af5c-a6cf750a2736",
            "cell_type": "code",
            "source": "print(b)",
            "metadata": {
                "trusted": true
            },
            "outputs": [
                {
                    "ename": "<class 'NameError'>",
                    "evalue": "name 'b' is not defined",
                    "traceback": [
                        "\u001b[0;31m---------------------------------------------------------------------------\u001b[0m",
                        "\u001b[0;31mNameError\u001b[0m                                 Traceback (most recent call last)",
                        "Cell \u001b[0;32mIn[13], line 1\u001b[0m\n\u001b[0;32m----> 1\u001b[0m \u001b[38;5;28mprint\u001b[39m(\u001b[43mb\u001b[49m)\n",
                        "\u001b[0;31mNameError\u001b[0m: name 'b' is not defined"
                    ],
                    "output_type": "error"
                }
            ],
            "execution_count": 13
        },
        {
            "id": "786f00b4-a598-4bf2-aadd-d99373f05bd5",
            "cell_type": "code",
            "source": "",
            "metadata": {
                "trusted": true
            },
            "outputs": [],
            "execution_count": null
        }
    ]
}
