import { Detection, GameController } from "../GameTypes";
import { Point, Scale, Circle } from "../Helpers/MathHelpers";
import { Activation } from "../Activation";

export class HandDetection extends Detection {
    start: Point = { x: -1, y: -1 }
    scale: Scale = { width: 0, height: 0 }
    score: number = 0;
}

export class HandGameController extends GameController {
    public life = new Activation(5, 20, 15);

    public get collider(): Circle {
        return {
            kind: "circle",
            center: this.position,
            radious: 15
        }
    }
}