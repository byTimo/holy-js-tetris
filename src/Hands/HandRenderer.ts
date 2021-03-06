import { GameContext } from "../GameTypes";
import { HandGameController, HandDetection } from "./Types";
import { RenderHelper } from "../Helpers/RenderHelper";

const pattern = /rect/;

function hasPatternInHash() {
    const hash = window.location.hash;
    const match = pattern.exec(hash);
    return !!match;
}

export class HandRenderer {
    private rect: boolean = hasPatternInHash();
    render = (ctx: CanvasRenderingContext2D, context: GameContext) => {
        for (const controller of context.controllers) {
            if (controller instanceof HandGameController) {
                const r = controller.life.score / controller.life.max * 13;
                const color = controller.life.active ? "green" : "orange";
                RenderHelper.withShadow(() => {
                    RenderHelper.renderFillCircle(ctx, controller.position, r, color);
                }, ctx, color, 15);
            }
        }

        for (const detection of context.detection) {
            if (detection instanceof HandDetection) {
                const red = 255 - 255 * detection.score;
                const green = 255 * detection.score;
                const c = `rgb(${red}, ${green}, 0)`;
                RenderHelper.renderFillCircle(ctx, detection.position, 2, c);
                if (this.rect) {
                    RenderHelper.renderStrokeRect(ctx, detection.start, detection.scale, c);
                }
            }
        }
    }

    private handleHashChanged = () => {
        this.rect = hasPatternInHash();
    }
}
