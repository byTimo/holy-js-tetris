import { RenderMiddleware, GameContext } from "../GameTypes";
import { PlayLevel } from "./PlayLevel";
import { PissingRag } from "./PissingRag";
import { RenderHelper } from "../Helpers/RenderHelper";
import { CodeLine } from "./CodeLine";

export class PlayLevelRenderer implements RenderMiddleware {
    constructor(private level: PlayLevel) {

    }

    public render(ctx: CanvasRenderingContext2D, context: GameContext) {
        //RenderHelper.renderRect(ctx, this.level.start, this.level.conveyor.scale, "red");
        for (const obj of this.level.linkedControllers.values()) {
            if (obj instanceof CodeLine) {
                this.renderLine(ctx, obj);
            }
        }

        for (const line of this.level.lines) {
            this.renderLine(ctx, line);
        }

        for (const saved of this.level.savedLines) {
            const { start, scale } = saved.collider;
            const color = saved.line ? "blue" : "orange"
            RenderHelper.renderRect(ctx, start, scale, color);
            if (saved.line) {
                RenderHelper.renderText(ctx, saved.line.text, start, "blue");
            }
        }

        const color = this.level.rag.active ? "red" : "gray";
        RenderHelper.renderPoint(ctx, this.level.rag.position, 30, color);

        const { start, scale } = this.level.trash.collider;
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