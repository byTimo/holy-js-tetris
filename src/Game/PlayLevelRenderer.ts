import { RenderMiddleware, GameContext } from "../GameTypes";
import { PlayLevel, TextButton } from "./Levels/PlayLevel";
import { RenderHelper } from "../Helpers/RenderHelper";
import { CodeLine } from "./CodeLine";
import { MathHelper } from "../Helpers/MathHelpers";
import { PissingRag } from "./PissingRag";

export class PlayLevelRenderer implements RenderMiddleware {
    public render(ctx: CanvasRenderingContext2D, context: GameContext) {
        if (!(context.level instanceof PlayLevel)) {
            return;
        }
        const level = context.level;

        for (const obj of level.controlled.values()) {
            if (obj instanceof CodeLine) {
                this.renderLine(ctx, obj);
            }
        }

        for (const line of level.lines) {
            this.renderLine(ctx, line);
        }

        for (const saved of level.savedLines) {
            const { start, scale } = saved.collider;
            const color = saved.line ? "blue" : "orange"
            RenderHelper.renderStrokeRect(ctx, start, scale, color);
            if (saved.line) {
                RenderHelper.renderText(ctx, saved.line.text, start, "blue");
            }
        }

        this.renderRag(ctx, level.rag);
        this.renderEnd(ctx, level.end);
    }

    private renderLine = (ctx: CanvasRenderingContext2D, line: CodeLine) => {
        const g = line.active.score / line.active.max * 255;
        const color = `rgb(0,${g},0)`;
        const { start, scale } = line.collider;
        RenderHelper.renderStrokeRect(ctx, start, scale, color);
        RenderHelper.renderText(ctx, line.text, start, color);
    }

    private renderRag = (ctx: CanvasRenderingContext2D, rag: PissingRag) => {
        const { center, radious } = rag.collider;
        RenderHelper.renderFillCircle(ctx, center, radious, "gray");
        const activeRadious = rag.active.activationPersentage * radious;
        RenderHelper.renderFillCircle(ctx, center, activeRadious, "red");
    }

    private renderEnd = (ctx: CanvasRenderingContext2D, end: TextButton) => {
        const { start, scale } = end.collider;
        RenderHelper.renderFillRect(ctx, start, scale, "#00ff00");
        const weight = end.active.activationPersentage;
        const innerScale = { width: weight * scale.width, height: weight * scale.height };
        const innerStart = MathHelper.start(end.position, innerScale);
        RenderHelper.renderFillRect(ctx, innerStart, innerScale, "green");
    }
}