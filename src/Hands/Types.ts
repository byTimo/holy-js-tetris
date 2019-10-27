import { Detection, GameController } from "../GameTypes";
import { Point, Scale } from "../Helpers/MathHelpers";

export class HandDetection extends Detection {
    start: Point = { x: -1, y: -1 }
    scale: Scale = { width: 0, height: 0 }
    score: number = 0;
}

export class HandGameController extends GameController {
    static initialLife = 5;
    static maxLife = 20;

    public life: number = HandGameController.initialLife;

    public get isActive () {
        return this.life >= HandGameController.maxLife;
    }

    public incrementLife = (): this => {
        this.life = this.life >= HandGameController.maxLife ? HandGameController.maxLife : this.life + 1;
        return this;
    }

    public decrementLife = (): this => {
        this.life = this.life <= 0 ? 0 : this.life - 1;
        return this;
    }
}