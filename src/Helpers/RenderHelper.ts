import { Point, Scale } from "./MathHelpers";

export type Filling = "stroke" | "fill";

export class RenderHelper {
    static renderPoint(ctx: CanvasRenderingContext2D, { x, y }: Point, r: number, c: string, filling: Filling = "fill") {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = c;
        filling === "fill" ? ctx.fill() : ctx.stroke();
    }

    static renderVideo(ctx: CanvasRenderingContext2D, video: HTMLVideoElement, width: number) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-width, 0);
        ctx.drawImage(video, 0, 0, video.width, video.height);
        ctx.restore();
    }

    static renderRect(ctx: CanvasRenderingContext2D, { x, y }: Point, { width, height }: Scale, color: string, filling: Filling = "stroke") {
        ctx.strokeStyle = color;
        filling === "fill" ? ctx.fillRect(x, y, width, height) : ctx.strokeRect(x, y, width, height);
    }

    static renderText(ctx: CanvasRenderingContext2D, text: string, { x, y }: Point, color: string, scale: number = 16) {
        ctx.font = `${scale}px arial`;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }
}