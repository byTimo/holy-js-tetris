import { RenderMiddleware, GameContext } from "../GameTypes";
import { StartLevel } from "./Levels/StartLevel";
import { RenderHelper } from "../Helpers/RenderHelper";

export class StartLevelRenderer implements RenderMiddleware {
    render = (ctx: CanvasRenderingContext2D, context: GameContext) => {
        if (!(context.level instanceof StartLevel)) {
            return;
        }
        const {start} = context.level;

        RenderHelper.renderStrokeCircle(ctx, start.position, 30, "white");
        const r = start.active.activationPersentage * 30;
        RenderHelper.renderFillCircle(ctx, start.position, r, "green");
    }
}