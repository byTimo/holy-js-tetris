
import { GameContext, RenderMiddleware, Level } from "../GameTypes";
import { ResultLevel } from "./Levels/ResultLevel";
import { RenderHelper } from "../Helpers/RenderHelper";
import { MathHelper } from "../Helpers/MathHelpers";

export class ResultLevelRenderer implements RenderMiddleware {
    render = (ctx: CanvasRenderingContext2D, context: GameContext) => {
        if (!(context.level instanceof ResultLevel)) {
            return;
        }

        const { title, summary, button, codeLabel } = context.level;

        RenderHelper.renderText(ctx, title.text, title.position, "white", 25);

        const part = summary.scale.height / 6;
        const start = MathHelper.start(summary.position, summary.scale);
        RenderHelper.renderText(ctx, "arguments:", { x: start.x, y: start.y + part / 2 }, "white", 14, "start");
        RenderHelper.renderText(ctx, JSON.stringify(summary.task.args), { x: start.x, y: start.y + 1.5 * part }, "white", 14, "start");
        RenderHelper.renderText(ctx, "expected:", { x: start.x, y: start.y + 2.5 * part }, "white", 14, "start");
        RenderHelper.renderText(ctx, JSON.stringify(summary.task.result), { x: start.x, y: start.y + 3.5 * part }, "white", 14, "start");
        RenderHelper.renderText(ctx, "previous:", { x: start.x, y: start.y + 4.5 * part }, "white", 14, "start");
        RenderHelper.renderText(ctx, JSON.stringify(summary.lastResult), { x: start.x, y: start.y + 5.5 * part }, "white", 14, "start");

        const lines = codeLabel.text.split("\n");
        const body = lines.slice(1, lines.length - 1);
        const codeStart = MathHelper.start(codeLabel.position, codeLabel.scale);
        RenderHelper.renderText(ctx, summary.task.title, { x: codeStart.x, y: codeStart.y + 10 }, "white", 16, "start")
        for (let i = 0; i < body.length; i++) {
            RenderHelper.renderText(ctx, body[i], { x: codeStart.x, y: codeStart.y + 10 + 20 * (i + 1) }, "white", 16, "start");
        }
        RenderHelper.renderText(ctx, "}", { x: codeStart.x, y: codeStart.y + 10 + 20 * (body.length + 1) }, "white", 16, "start")


        const { center, radious } = button.collider;

        RenderHelper.renderStrokeCircle(ctx, center, radious, "white");
        const r = button.active.activationPersentage * radious;
        RenderHelper.renderFillCircle(ctx, button.position, r, "green");
    }
}