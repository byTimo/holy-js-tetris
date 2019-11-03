import { Level, GameContext } from "../../GameTypes";
import { Scale, MathHelper } from "../../Helpers/MathHelpers";
import { PlayLevel } from "./PlayLevel";
import { Button } from "../Objects/Button";

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