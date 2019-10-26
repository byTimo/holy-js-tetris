import { DrawerBase } from "./DrawerBase";
import { Hand } from "../HandDetector";

const colors = [
    "red",
    "blue",
    "orange",
    "yellow",
    "green"
];

type HandRenderInfo = {
    position: [number, number],
    color: string,
    scale: [number, number]
};

export class HandsDrawer {
    private readonly ctx: CanvasRenderingContext2D;
    private rendering: boolean = false;

    private queue: Array<HandRenderInfo[]> = [];

    constructor(private canvas: HTMLCanvasElement, private video?: HTMLVideoElement) {
        this.ctx = canvas.getContext("2d")!;
    }

    public start = () => {
        this.rendering = true;
        this.render();
    }

    public end = () => {
        this.rendering = false;
    }

    public append = (hands: Hand[]) => {
        const info: HandRenderInfo[] = hands.map((h, i) => {
            const { mx, my, width, height } = h;
            return {
                position: [mx, my],
                scale: [width, height],
                color: colors[i]
            }
        })
        this.queue.unshift(info);
    }

    private render = () => {
        if (this.rendering) {
            requestAnimationFrame(this.render);
        }

        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.fillStyle = this.video ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, .15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = "source-over"

        if (this.video) {
            this.drawVideo(this.video);
        }

        if (this.queue.length === 0) {
            return;
        }

        if (this.queue.length === 1) {
            const current = this.queue[0];
            for (const info of current) {
                this.renderHandPosition(info, info);
            }
            return;
        }

        const prev = this.queue.pop()!;
        const current = this.queue[this.queue.length - 1];
        for (let i = 0; i < current.length; i++) {
            const info = current[i];
            const last = this.findLast(info, prev, 400);
            this.renderHandPosition(info, last);
        }
    }

    private findLast = (info: HandRenderInfo, prev: HandRenderInfo[], threshold: number = 100): HandRenderInfo => {
        const min = prev.map(i => ({ i, d: this.distance(info.position, i.position) })).reduce((a, c) => c.d < a.d ? c : a);
        return min.d < threshold ? min.i : info;
    }

    private distance = ([x1, y1]: [number, number], [x2, y2]: [number, number]): number => {
        const dx = x2 - x1, dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private renderHandPosition = (last: HandRenderInfo, next: HandRenderInfo) => {
        const {position: [x1, y1], color} = last, { position: [x2, y2], scale: [width, height] } = next;
        const radious = Math.min(width, height) * 0.5;
        if (x1 === x2 && y1 === y2) {
            DrawerBase.renderPoint(this.ctx, [x1, y1], radious / 2, color);
        } else {
            DrawerBase.renderPoint(this.ctx, [x1, y1], radious / 2, color);
            DrawerBase.renderPoint(this.ctx, [x2, y2], radious / 2, color);
            DrawerBase.renderLine(this.ctx, [x1, y1], [x2, y2], radious, color);
        }
    }

    protected drawVideo = (video: HTMLVideoElement) => {
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.canvas.width, 0);
        this.ctx.drawImage(video, 0, 0, video.width, video.height);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.canvas.width, 0);
    }
}