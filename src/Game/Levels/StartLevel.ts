import { Level, GameContext } from "../../GameTypes";
import { Scale, MathHelper } from "../../Helpers/MathHelpers";
import { PlayLevel } from "./PlayLevel";
import { Button } from "../Objects/Button";

export class StartLevel extends Level {
    public start: Button;

    constructor(private scale: Scale) {
        super();
        this.start = new Button(MathHelper.center({ x: 0, y: 0 }, scale), MathHelper.scale(scale, 0.025));
    }

    invoke = (context: GameContext): Level => {
        const controller = context.controllers.find(x => MathHelper.hasCollision(x.collider, this.start.collider))
        if (controller) {
            this.start.active.inc();
        } else {
            this.start.active.dec();
        }

        return this.start.active.active ? new PlayLevel(this.scale) : this;
    }
}