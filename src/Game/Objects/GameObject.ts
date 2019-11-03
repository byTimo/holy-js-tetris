import { Point, Figure } from "../../Helpers/MathHelpers";
import { Activation } from "../../Activation";
export abstract class GameObject {
    readonly abstract active: Activation;
    readonly abstract collider: Figure;
    constructor(public position: Point) {
    }
}
