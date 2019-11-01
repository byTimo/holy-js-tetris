import { Rect, Point } from "../Helpers/MathHelpers";
import { CodeLine } from "./CodeLine";
import { Activation } from "../Activation";
import { GameObject } from "./GameObject";

export class SaveLine extends GameObject {
    public line: CodeLine | null = null;

    public active: Activation = new Activation(0, 40, 40);

    public get collider(): Rect {
        return {
            kind: "rect",
            start: { x: this.position.x - 100, y: this.position.y - 20 },
            scale: { width: 200, height: 40 }
        };
    }
}
