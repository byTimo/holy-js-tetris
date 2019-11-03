import { RenderMiddleware, GameContext } from "../GameTypes";
import { StartLevel } from "./Levels/StartLevel";
import { RenderHelper } from "../Helpers/RenderHelper";

export class StartLevelRenderer implements RenderMiddleware {
    render = (ctx: CanvasRenderingContext2D, context: GameContext) => {
        if (!(context.level instanceof StartLevel)) {
            return;
        }
        const { start } = context.level;
        const { center, radious } = start.collider;

        RenderHelper.renderStrokeCircle(ctx, center, radious, "white");
        const r = start.active.activationPersentage * radious;
        RenderHelper.renderFillCircle(ctx, start.position, r, "green");
    }
}