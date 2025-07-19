export type Notebook = {
    metadata: NotebookMetadata,
    nbformat: number,
    nbformat_minor: number,
    cells: NotebookCell[]
}

type NotebookMetadata = { // TODO: verify these
    kernel_info?: {
        name: string
    },
    language_info?: {
        name: string,
        version?: string,
        file_extension?: string,
        codemirror_mode?: {
            name: string,
            version: string,
        },
        mimetype?: string,
        nbconvert_exporter?: string,
        pygments_lexer?: string
    }
}

type NotebookCell = MarkdownCell | CodeCell | RawCell;

type MarkdownCell = {
    cell_type: 'markdown',
    metadata: {},
    source: string,
    attachments?: Record<string, Record<string, string>>
}

type CodeCell = {
    cell_type: 'code',
    metadata: { // TODO
        collapsed?: boolean,
        scrolled?: boolean | 'auto',
    },
    execution_count: number | null,
    source: string,
    outputs: CodeCellOutput[]
}

type CodeCellOutput = CodeCellStreamOutput
    | CodeCellDisplayDataOutput
    | CodeCellExecuteResultOutput
    | CodeCellErrorOutput;

type CodeCellStreamOutput = {
    output_type: 'stream',
    name: 'stdout' | 'stderr',
    text: string,
}

type CodeCellDisplayDataOutput = {
    output_type: 'display_data',

    /**
     * A {@Link https://nbformat.readthedocs.io/en/latest/format_description.html#display-data "mime bundle"}
     * associating mime types to their corresponding data.
     */
    data: Record<string, any>

    /**
     * A {@Link https://nbformat.readthedocs.io/en/latest/format_description.html#display-data "mime bundle"}
     * associating mime types to their corresponding metadata.
     */
    metadata: Record<string, any>
}

type CodeCellExecuteResultOutput = {
    output_type: 'execute_result',
    execution_count: number,

    /**
     * A {@Link https://nbformat.readthedocs.io/en/latest/format_description.html#display-data "mime bundle"}
     * associating mime types to their corresponding data.
     */
    data: Record<string, any>

    /**
     * A {@Link https://nbformat.readthedocs.io/en/latest/format_description.html#display-data "mime bundle"}
     * associating mime types to their corresponding metadata.
     */
    metadata: Record<string, any>
}

type CodeCellErrorOutput = {
    output_type: 'error',
    ename: string,
    evalue: string,
    traceback: string[]
}

type RawCell = {
    cell_type: 'raw',
    metadata: {
        format: string
    },
    source: string,
}
