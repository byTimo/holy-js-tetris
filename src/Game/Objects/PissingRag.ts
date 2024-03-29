import { Circle } from "../../Helpers/MathHelpers";
import { Activation } from "../../Activation";
import { GameObject } from "./GameObject";

export class PissingRag extends GameObject {
    public readonly active = new Activation(0, 50, 50);
    public get collider(): Circle {
        return {
            kind: "circle",
            center: this.position,
            radious: this.scale.width
        };
    }
}
