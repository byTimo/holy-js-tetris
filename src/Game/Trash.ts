import { Rect } from "../Helpers/MathHelpers";
import { GameObject } from "./GameObject";
import { Activation } from "../Activation";
export class Trash extends GameObject {
    public readonly active = new Activation(0, 0, 0);
    public get collider(): Rect {
        return {
            kind: "rect",
            start: { x: this.position.x - 25, y: this.position.y - 50 },
            scale: { width: 50, height: 100 }
        };
    }
}
