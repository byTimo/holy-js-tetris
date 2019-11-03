import { MathHelper, Rect, Point } from "../../Helpers/MathHelpers";
import { GameObject } from "./GameObject";
import { Activation } from "../../Activation";
export class TextButton extends GameObject {
    public readonly active = new Activation(0, 100, 100);
    constructor(public readonly text: string, position: Point) {
        super(position);
    }
    public get collider(): Rect {
        const scale = { width: 100, height: 50 };
        return {
            kind: "rect",
            start: MathHelper.start(this.position, scale),
            scale
        };
    }
}
