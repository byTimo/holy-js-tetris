import { Point, Scale } from "./Helpers/MathHelpers";

export class Detection {
    position: Point = { x: -1, y: -1 }
}
export interface MouseDetection {
    kind: "mouse";
    position: Point;
}

export class GameController {
    public position: Point = { x: -1, y: -1 };

    public setPosition = (next: Point): this => {
        this.position = next;
        return this;
    }
}

export interface GameContext {
    canvas: HTMLCanvasElement;
    controllers: GameController[];
    detection: Detection[];
}

export interface GameMiddleware {
    invoke(context: GameContext): void;
}

export interface RenderMiddleware {
    render(ctx: CanvasRenderingContext2D, context: GameContext): void;
}
