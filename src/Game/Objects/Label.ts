import { GameObject } from "./GameObject";
import { Rect, Point, MathHelper, Scale } from "../../Helpers/MathHelpers";
import { Activation } from "../../Activation";

export class Label extends GameObject {
    constructor(public text: string, position: Point, scale: Scale) {
        super(position, scale);
    }

    public readonly active = new Activation(0, 0, 0);
    public get collider(): Rect {
        return {
            kind: "rect",
            start: MathHelper.start(this.position, this.scale),
            scale: this.scale
        }
    }
}