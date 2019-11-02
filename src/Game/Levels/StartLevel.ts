import { Level, GameContext } from "../../GameTypes";
import { Scale, Circle, MathHelper } from "../../Helpers/MathHelpers";
import { GameObject } from "../GameObject";
import { Activation } from "../../Activation";
import { PlayLevel } from "./PlayLevel";

export class Button extends GameObject {
    public active = new Activation(0, 100, 100);

    public get collider(): Circle {
        return {
            kind: "circle",
            center: this.position,
            radious: 30
        }
    }
}

export class StartLevel extends Level {
    public start: Button;

    constructor(private scale: Scale) {
        super();
        this.start = new Button(MathHelper.center({ x: 0, y: 0 }, scale));
    }

    invoke = (context: GameContext): Level => {
        for (const controller of context.controllers) {
            if (MathHelper.hasCollision(controller.collider, this.start.collider)) {
                this.start.active.inc();
            } else {
                this.start.active.dec();
            }
        }

        return this.start.active.active ? new PlayLevel(this.scale) : this;
    }
}