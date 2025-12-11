'use client'

import { useState } from 'react';


export default function EmbedInput() {  // TODO: naming
    const [url, setUrl] = useState('');

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="max-w-prose flex flex-col items-center">
                <h1 className="font-bold mb-2 text-xl">Jupyter Notebook embed</h1>
                <p className="text-sm text-center">
                    Enter a Jupyter Notebook URL below to view an interactive web preview.
                    Note that the entered URL must resolve <em>directly</em> to the Jupyter Notebook's contents, e.g.
                    for a notebook hosted on GitHub, you should input the <code>raw.githubusercontent.com</code> link.
                </p>

                <form
                    className="w-full mt-4 flex"
                    onSubmit={(e) => {
                        e.preventDefault();
                        window.location.href = `/embed?url=${url}`;
                    }}
                >
                    <input
                        required
                        type="text"
                        className="border border-black/30 rounded px-3 py-1 mx-4 grow"
                        placeholder="https://..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </form>
                <p className="text-sm mt-0.5">
                    or <a className="text-blue-700 hover:underline" href="/embed?url=https://raw.githubusercontent.com/jupyter/notebook/refs/heads/main/docs/source/examples/Notebook/Running%20Code.ipynb">view an example</a>.
                </p>
            </div>
        </div>
    )
}
