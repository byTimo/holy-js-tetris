import { TestDetector } from "./Hands/TestDetector";
import { HandControllerProvider } from "./Hands/HandControllerProvider";
import { AsyncHelper } from "./Helpers/AsyncHelper";
import { GameContext, GameMiddleware } from "./GameTypes";
import { GameRenderer } from "./GameRenderer";
import { MouseDetector } from "./Detection/MouseDetector";
import { HandDetector } from "./Hands/HandDetector";

const actionDelay = 30;
const renderDelay = 1;

export class Game {
    private run: boolean = false;
    private context: GameContext;
    private middleware: GameMiddleware[];
    private renderer: GameRenderer;

    constructor(canvas: HTMLCanvasElement, video: HTMLVideoElement) {
        this.renderer = new GameRenderer(canvas, video);
        this.context = {
            canvas,
            controllers: [],
            detection: []
        }
        this.middleware = [
            new HandDetector(video),
            new HandControllerProvider(),
        ]
    }

    start = () => {
        this.run = true;
        this.next();
        this.render();
    }

    stop = () => {
        this.run = false;
    }

    private next = async () => {
        for (const current of this.middleware) {
            current.invoke(this.context);
        }

        if (this.run) {
            AsyncHelper.animate(this.next, actionDelay);
        }
    }

    private render = () => {
        this.renderer.render(this.context);
        if (this.run) {
            AsyncHelper.animate(this.render, renderDelay);
        }
    }
}