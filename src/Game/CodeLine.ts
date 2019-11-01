import { Point, Rect, Scale } from "../Helpers/MathHelpers";
import { Activation } from "../Activation";
import { GameObject } from "./GameObject";

export class CodeLine extends GameObject {
    public readonly active: Activation = new Activation(0, 100, 10);
    public inConveyor = true;

    constructor(public readonly text: string, position: Point) {
        super(position)
    }

    public get collider(): Rect {
        const scale: Scale = { width: 150, height: 20 };
        return {
            kind: "rect",
            start: { x: this.position.x - scale.width / 2, y: this.position.y - scale.height / 2 },
            scale
        }
    }

    public setPosition(position: Point) {
        this.position = position;
    }
}