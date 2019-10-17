import { Keypoint, getAdjacentKeyPoints } from "@tensorflow-models/posenet";
import { SkeletonePose } from "./PoseDetector";

type Segment = [number, number];

export class PoseDrawer {
    private ctx: CanvasRenderingContext2D | null = null;

    constructor(private canvas: HTMLCanvasElement, private video?: HTMLVideoElement) {
        this.ctx = canvas.getContext("2d")
    }

    public draw = (pose: SkeletonePose): void => {
        if (!this.ctx) {
            throw new Error("No canvas cotext for drawing");
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.canvas.width, 0);
        if (this.video) {
            this.ctx.drawImage(this.video, 0, 0, this.video.width, this.video.height);
        }
        this.ctx.restore();

        this.drawKeypoints(pose.keypoints);
        this.drawSkeleton(pose.segments);
    }

    private drawSkeleton = (segments: Keypoint[][], scale: number = 1) => {
        for (const segment of segments) {
            const first: [number, number] = [segment[0].position.y, segment[0].position.x];
            const second: [number, number] = [segment[1].position.y, segment[1].position.x];
            this.drawSegment(first, second, "red", scale)
        }
    }

    private drawKeypoints(keypoints: Keypoint[], scale: number = 1) {
        for (const keypoint of keypoints) {
            const { y, x } = keypoint.position;
            this.drawPoint(y * scale, x * scale, 3, "red");
            getAdjacentKeyPoints
        }
    }

    private drawSegment = ([y1, x1]: Segment, [y2, x2]: Segment, color: string, scale: number) => {
        this.ctx!.beginPath();
        this.ctx!.moveTo(x1 * scale, y1 * scale);
        this.ctx!.lineTo(x2 * scale, y2 * scale);
        this.ctx!.lineWidth = 5;
        this.ctx!.strokeStyle = color;
        this.ctx!.stroke();
    }

    private drawPoint = (y: number, x: number, r: number, color: string) => {
        this.ctx!.beginPath();
        this.ctx!.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx!.fillStyle = color;
        this.ctx!.fill();
    }
}