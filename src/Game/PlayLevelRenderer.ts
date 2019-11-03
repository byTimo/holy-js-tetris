import { RenderMiddleware, GameContext } from "../GameTypes";
import { PlayLevel } from "./Levels/PlayLevel";
import { TextButton } from "./Objects/TextButton";
import { RenderHelper } from "../Helpers/RenderHelper";
import { CodeLine } from "./Objects/CodeLine";
import { MathHelper } from "../Helpers/MathHelpers";
import { PissingRag } from "./Objects/PissingRag";
import { SaveLine } from "./Objects/SaveLine";

export class PlayLevelRenderer implements RenderMiddleware {
    public render(ctx: CanvasRenderingContext2D, context: GameContext) {
        if (!(context.level instanceof PlayLevel)) {
            return;
        }
        const level = context.level;

        const { start, scale } = level.funcTitleLabel.collider;
        RenderHelper.renderStrokeRect(ctx, start, scale, "orange");
        RenderHelper.renderText(ctx, level.funcTitleLabel.text, level.funcTitleLabel.position, "orange");

        const c = level.funcCloseLabel.collider;
        RenderHelper.renderStrokeRect(ctx, c.start, c.scale, "orange");
        RenderHelper.renderText(ctx, level.funcCloseLabel.text, level.funcCloseLabel.position, "orange");

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
    }

    private renderLine = (ctx: CanvasRenderingContext2D, line: CodeLine) => {
        const { start, scale } = line.collider;
        const color = "#CA6F1E";
        RenderHelper.renderStrokeRect(ctx, start, scale, color);
        RenderHelper.renderText(ctx, line.line.text, line.position, color);
    }

    private renderSaved = (ctx: CanvasRenderingContext2D, saved: SaveLine) => {
        const { start, scale } = saved.collider;
        const color = saved.line ? "blue" : "orange"
        RenderHelper.renderStrokeRect(ctx, start, scale, color);
        if (saved.line) {
            RenderHelper.renderText(ctx, saved.line.line.text, saved.position, "blue");
        }
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