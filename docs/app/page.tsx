import NotebookDemo from '@/app/NotebookDemo';


export default function Home() {
    return (
        <main className="container py-20 px-16 mx-auto">
            <h1 className="-ml-2 text-4xl font-bold mb-3">
                @ky28059/react-jupyter-renderer
            </h1>
            <p className="mb-6">
                An interactive Jupyter notebook renderer in React based on [...]
            </p>

            <NotebookDemo />
        </main>
    );
}
