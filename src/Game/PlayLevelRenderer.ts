import { RenderMiddleware, GameContext } from "../GameTypes";
import { PlayLevel } from "./Levels/PlayLevel";
import { TextButton } from "./Objects/TextButton";
import { RenderHelper } from "../Helpers/RenderHelper";
import { CodeLine } from "./Objects/CodeLine";
import { MathHelper } from "../Helpers/MathHelpers";
import { PissingRag } from "./Objects/PissingRag";
import { SaveLine } from "./Objects/SaveLine";
import { TaskSummary } from "./Objects/TaskSummary";
import { ColorHelper } from "../Helpers/ColorHelper";

const playChar = "\u25B6";

export class PlayLevelRenderer implements RenderMiddleware {
    public render(ctx: CanvasRenderingContext2D, context: GameContext) {
        if (!(context.level instanceof PlayLevel)) {
            return;
        }
        const level = context.level;

        const { start, scale } = level.funcTitleLabel.collider;
        RenderHelper.renderFillRect(ctx, start, scale, "#fee851")
        RenderHelper.renderText(ctx, level.funcTitleLabel.text, level.funcTitleLabel.position, "black");

        const c = level.funcCloseLabel.collider;
        RenderHelper.renderFillRect(ctx, c.start, c.scale, "#fee851");
        RenderHelper.renderText(ctx, level.funcCloseLabel.text, level.funcCloseLabel.position, "black");

        for (const obj of level.controlled.values()) {
            if (obj instanceof CodeLine) {
                this.renderLine(ctx, obj);
            }
        }

        for (const line of level.lines) {
            this.renderLine(ctx, line);
        }

        for (const saved of level.savedLines) {
            this.renderSaved(ctx, saved);
        }

        this.renderRag(ctx, level.rag);
        this.renderEnd(ctx, level.end);
        this.renderTaskSummary(ctx, level.taskSummary);
    }

    private renderLine = (ctx: CanvasRenderingContext2D, line: CodeLine) => {
        const color = ColorHelper.linear([26, 87, 143], [29, 162, 220], line.active.maxPersentage);
        const { start, scale } = line.collider;
        RenderHelper.withShadow(() => {
            RenderHelper.renderFillRect(ctx, start, scale, color);
            RenderHelper.renderText(ctx, line.line.text, line.position, "black");
        }, ctx, color, 15 * line.active.maxPersentage)
    }

    private renderSaved = (ctx: CanvasRenderingContext2D, saved: SaveLine) => {
        const { start, scale } = saved.collider;
        if (saved.line) {
            RenderHelper.renderFillRect(ctx, start, scale, "#fee851")
            RenderHelper.renderText(ctx, saved.line.line.text, saved.position, "black");
        } else {
            const color = ColorHelper.linear([240, 81, 35], [254, 232, 81], saved.active.activationPersentage)
            RenderHelper.withShadow(() => {
                RenderHelper.renderStrokeRect(ctx, start, scale, color);
            }, ctx, color, 10 * saved.active.activationPersentage);
        }
    }

    private renderRag = (ctx: CanvasRenderingContext2D, rag: PissingRag) => {
        const { center, radious } = rag.collider;
        RenderHelper.withShadow(() => {
            RenderHelper.renderFillCircle(ctx, center, radious - 3, "#828282");
        }, ctx, "#828282", 5);
        const activeRadious = rag.active.activationPersentage * radious;
        RenderHelper.withShadow(() => {
            RenderHelper.renderFillCircle(ctx, center, activeRadious > 3 ? activeRadious - 3 : 0, "#ee2524");
        }, ctx, "#ee2524", 10);
    }

    private renderEnd = (ctx: CanvasRenderingContext2D, end: TextButton) => {
        const { start, scale } = end.collider;
        RenderHelper.renderStrokeRect(ctx, start, scale, "#828282");
        const weight = end.active.activationPersentage;
        const innerScale = { width: weight * scale.width, height: weight * scale.height };
        const innerStart = MathHelper.start(end.position, innerScale);
        RenderHelper.withShadow(() => {
            RenderHelper.renderFillRect(ctx, innerStart, innerScale, "green");
            RenderHelper.renderText(ctx, `${playChar} tries: ${end.text}`, end.position, "white")
        }, ctx, "green", 10);
    }

    private renderTaskSummary = (ctx: CanvasRenderingContext2D, summary: TaskSummary) => {
        const part = summary.scale.height / 6;
        const start = MathHelper.start(summary.position, summary.scale);
        RenderHelper.renderText(ctx, "arguments:", { x: start.x, y: start.y + part / 2 }, "white", 14, "start");
        RenderHelper.renderText(ctx, JSON.stringify(summary.task.args), { x: start.x, y: start.y + 1.5 * part }, "white", 14, "start");
        RenderHelper.renderText(ctx, "expected:", { x: start.x, y: start.y + 2.5 * part }, "white", 14, "start");
        RenderHelper.renderText(ctx, JSON.stringify(summary.task.result), { x: start.x, y: start.y + 3.5 * part }, "white", 14, "start");
        RenderHelper.renderText(ctx, "previous:", { x: start.x, y: start.y + 4.5 * part }, "white", 14, "start");
        RenderHelper.renderText(ctx, JSON.stringify(summary.lastResult), { x: start.x, y: start.y + 5.5 * part }, "white", 14, "start");
    }
}