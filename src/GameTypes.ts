import { Point, Scale, Figure } from "./Helpers/MathHelpers";

export abstract class Level {
    abstract invoke(context: GameContext): Level;
}

export class Detection {
    position: Point = { x: -1, y: -1 }
}

export abstract class GameController {
    public position: Point = { x: -1, y: -1 };

    public setPosition = (next: Point): this => {
        this.position = next;
        return this;
    }

    public abstract get collider(): Figure;
}

export interface GameContext {
    canvas: HTMLCanvasElement;
    controllers: GameController[];
    detection: Detection[];
    level: Level;
}

export interface GameMiddleware {
    invoke(context: GameContext): void;
}

export interface RenderMiddleware {
    render(ctx: CanvasRenderingContext2D, context: GameContext): void;
}
