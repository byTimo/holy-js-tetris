import { GameContext } from "../GameTypes";
import { HandGameController, HandDetection } from "./Types";
import { RenderHelper } from "../Helpers/RenderHelper";

export class HandRenderer {
    render = (ctx: CanvasRenderingContext2D, context: GameContext) => {
        for (const controller of context.controllers) {
            if (controller instanceof HandGameController) {
                const r = controller.life / HandGameController.maxLife * 15;
                RenderHelper.renderPoint(ctx, controller.position, r, controller.isActive ? "green" : "orange");
            }
        }

        for (const detection of context.detection) {
            if (detection instanceof HandDetection) {
                const red = 255 - 255 * detection.score;
                const green = 255*detection.score;
                const c = `rgb(${red}, ${green}, 0)`;
                RenderHelper.renderPoint(ctx, detection.position, 2, c);
                RenderHelper.renderRect(ctx, detection.start, detection.scale, c);
                RenderHelper.renderText(ctx, detection.score.toString(), detection.start, c, 50);
            }
        }
    }
}
