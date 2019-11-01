import { GameMiddleware, GameContext } from "../GameTypes";
import { HandDetection } from "./Types";
import { ObjectHelper } from "../Helpers/ObjectHelpers";

export class HandMouseDetector implements GameMiddleware {
    private detection: HandDetection[] = [];
    constructor(private canvas: HTMLCanvasElement) {
        canvas.addEventListener("mousemove", this.handleMouseMove);
    }

    invoke = (context: GameContext) => {
        context.detection = this.detection;
    }

    private handleMouseMove = (e: MouseEvent) => {
        var rect = this.canvas.getBoundingClientRect(), // abs. size of element
            scaleX = this.canvas.width / rect.width, // relationship bitmap vs. element for X
            scaleY = this.canvas.height / rect.height; // relationship bitmap vs. element for Y

        const center = { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
        this.detection = [ObjectHelper.create(HandDetection, {
            position: center,
            scale: { width: 20, height: 20},
            score: 1,
            start: { x: center.x - 10, y: center.y - 10 },
        })];
    }
}