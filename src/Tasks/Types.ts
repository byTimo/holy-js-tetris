export interface CodeTask {
    title: string;
    header: string;
    args: any[];
    result: any;
    lines: CodeTaskLine[];
}

export interface CodeTaskLine {
    text: string;
    code: string;
}