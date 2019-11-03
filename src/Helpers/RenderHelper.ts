import { Point, Scale } from "./MathHelpers";

export class RenderHelper {
    static renderVideo(ctx: CanvasRenderingContext2D, video: HTMLVideoElement, width: number) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-width, 0);
        ctx.drawImage(video, 0, 0, video.width, video.height);
        ctx.restore();
    }

    static renderFillCircle(ctx: CanvasRenderingContext2D, { x, y }: Point, r: number, c: string) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = c;
        ctx.fill();
    }

    static renderStrokeCircle(ctx: CanvasRenderingContext2D, { x, y }: Point, r: number, c: string) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.strokeStyle = c;
        ctx.stroke();
    }

    static renderFillRect(ctx: CanvasRenderingContext2D, { x, y }: Point, { width, height }: Scale, color: string) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    static renderStrokeRect(ctx: CanvasRenderingContext2D, { x, y }: Point, { width, height }: Scale, color: string) {
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, width, height);
    }

    static renderText(ctx: CanvasRenderingContext2D, text: string, { x, y }: Point, color: string, scale: number = 16) {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${scale}px arial`;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    static setShadow(ctx: CanvasRenderingContext2D, color: string, blur: number) {
        ctx.shadowBlur = blur;
        ctx.shadowColor = color;
    }
}