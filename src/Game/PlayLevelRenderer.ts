import { RenderMiddleware, GameContext } from "../GameTypes";
import { PlayLevel } from "./Levels/PlayLevel";
import { RenderHelper } from "../Helpers/RenderHelper";
import { CodeLine } from "./CodeLine";

export class PlayLevelRenderer implements RenderMiddleware {
    public render(ctx: CanvasRenderingContext2D, context: GameContext) {
        if (!(context.level instanceof PlayLevel)) {
            return;
        }
        const level = context.level;

        for (const obj of level.linkedControllers.values()) {
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
            RenderHelper.renderRect(ctx, start, scale, color);
            if (saved.line) {
                RenderHelper.renderText(ctx, saved.line.text, start, "blue");
            }
        }

        const color = level.rag.active ? "red" : "gray";
        RenderHelper.renderPoint(ctx, level.rag.position, 30, color);

        const { start, scale } = level.trash.collider;
        RenderHelper.renderRect(ctx, start, scale, "white");
    }

    private renderLine = (ctx: CanvasRenderingContext2D, line: CodeLine) => {
        const g = line.active.score / line.active.max * 255;
        const color = `rgb(0,${g},0)`;
        const { start, scale } = line.collider;
        RenderHelper.renderRect(ctx, start, scale, color);
        RenderHelper.renderText(ctx, line.text, start, color);
    }
}