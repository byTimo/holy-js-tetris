import { Point, Rect, Scale, MathHelper } from "../../Helpers/MathHelpers";
import { Activation } from "../../Activation";
import { GameObject } from "./GameObject";
import { CodeTaskLine } from "../../Tasks/Types";

export class CodeLine extends GameObject {
    public readonly active: Activation = new Activation(0, 40, 25);

    constructor(public readonly line: CodeTaskLine, position: Point, scale: Scale) {
        super(position, scale)
    }

    public get collider(): Rect {
        return {
            kind: "rect",
            start: MathHelper.start(this.position, this.scale),
            scale: this.scale,
        }
    }
}