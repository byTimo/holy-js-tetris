import { EstimatedPose } from "../Detection/PoseEstimator";

type Point = { x: number, y: number };

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

    protected drawRect = ({ x, y }: Point, w: number, h: number, color: string) => {
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, w, h);
    }

    protected drawVideo = (video: HTMLVideoElement) => {
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.canvas.width, 0);
        this.ctx.drawImage(video, 0, 0, video.width, video.height);
        this.ctx.restore();
    }

    protected drawSegment = ({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point, color: string, scale: number) => {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineWidth = scale;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    protected drawPoint = ({ x, y }: Point, r: number, color: string) => {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
}