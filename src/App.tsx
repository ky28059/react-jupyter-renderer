import JupyterNotebook from './JupyterNotebook.tsx';

export default function App() {
    return (
        <div>
            <JupyterNotebook
                notebook={{
                    "metadata": {
                        "kernelspec": {
                            "name": "python",
                            "display_name": "Python (Pyodide)",
                            "language": "python"
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
                            "id": "17518e2f-7306-434f-8f0c-57ab66226038",
                            "cell_type": "code",
                            "source": "print(a)\nb = 3",
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
                            "execution_count": 4
                        },
                        {
                            "id": "f98220d8-23c9-4c74-bd85-2ce28326fe4a",
                            "cell_type": "code",
                            "source": "a = 5",
                            "metadata": {
                                "trusted": true
                            },
                            "outputs": [],
                            "execution_count": 3
                        },
                        {
                            "id": "8ea50990-16f1-40df-af18-8b8e0ea67713",
                            "cell_type": "code",
                            "source": "print(b)",
                            "metadata": {
                                "trusted": true
                            },
                            "outputs": [
                                {
                                    "name": "stdout",
                                    "output_type": "stream",
                                    "text": "3\n"
                                }
                            ],
                            "execution_count": 5
                        },
                        {
                            "id": "a7c23cb0-1c23-4b4e-9c29-0b2ee4d22823",
                            "cell_type": "code",
                            "source": "",
                            "metadata": {
                                "trusted": true
                            },
                            "outputs": [],
                            "execution_count": null
                        }
                    ]
                }}
            />
        </div>
    )
}
