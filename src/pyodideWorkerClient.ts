let lastId = 1;
function getId() {
    return lastId++;
}

// Implementation based on https://pyodide.org/en/stable/usage/webworker.html
export async function sendAndReceiveResponse(worker: Worker, message: any) {
    return new Promise<any>((res) => {
        const currId = getId();

        // Listen for the next message that matches the current ID
        worker.addEventListener('message', function listener(e) {
            if (e.data.id !== currId) return;

            worker.removeEventListener('message', listener);
            const { id, ...rest } = e.data;
            res(rest);
        });

        worker.postMessage({ id: currId, ...message });
    })
}
