import { EstimatedPose } from "../Detection/PoseEstimator";

type Point = [number, number];

export abstract class DrawerBase<T = EstimatedPose> {
    protected readonly ctx: CanvasRenderingContext2D;

    constructor(protected readonly canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d")!;
    }

    public abstract draw(poses: T[]): void;

    protected clear = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
    }

    protected drawRect = ([x, y]: Point, [w, h]: Point, color: string) => {
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, w, h);
    }

    protected drawVideo = (video: HTMLVideoElement) => {
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.canvas.width, 0);
        this.ctx.drawImage(video, 0, 0, video.width, video.height);
        this.ctx.restore();
    }

    protected drawSegment = ([x1, y1]: Point, [x2, y2]: Point, color: string, scale: number) => {
        this.ctx.beginPath();
        this.ctx.moveTo(x1 * scale, y1 * scale);
        this.ctx.lineTo(x2 * scale, y2 * scale);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    protected drawPoint = (x: number, y: number, r: number, color: string) => {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
}