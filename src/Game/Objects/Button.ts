import { Circle } from "../../Helpers/MathHelpers";
import { GameObject } from "./GameObject";
import { Activation } from "../../Activation";

export class Button extends GameObject {
    public active = new Activation(0, 100, 100);
    public get collider(): Circle {
        return {
            kind: "circle",
            center: this.position,
            radious: this.scale.width,
        };
    }
}
