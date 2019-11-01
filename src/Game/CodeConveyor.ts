import { Point, Scale, Rect } from "../Helpers/MathHelpers";
import { CodeLine } from "./CodeLine";
export class CodeConveyor implements Rect {
    private ctx: CanvasRenderingContext2D;
    kind: "rect" = "rect";
    public start: Point;
    public scale: Scale;
    public lines: CodeLine[] = [];
    constructor(private canvas: HTMLCanvasElement) {
        this.start = { x: 0, y: 0 };
        this.scale = { width: 300, height: canvas.height };
        this.ctx = canvas.getContext("2d")!;
    }
    public next = () => {
        if (this.lines.length === 0) {
            const line = new CodeLine("lalka", { x: 150, y: 10 });
            this.lines.push(line);
        }
        //this.lines[0].drugDec();
    };
}
