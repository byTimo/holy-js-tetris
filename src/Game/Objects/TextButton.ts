import { MathHelper, Rect, Point, Scale } from "../../Helpers/MathHelpers";
import { GameObject } from "./GameObject";
import { Activation } from "../../Activation";
export class TextButton extends GameObject {
    public readonly active = new Activation(0, 50, 50);
    constructor(public readonly text: string, position: Point, scale: Scale) {
        super(position, scale);
    }
    public get collider(): Rect {
        return {
            kind: "rect",
            start: MathHelper.start(this.position, this.scale),
            scale: this.scale
        };
    }
}
