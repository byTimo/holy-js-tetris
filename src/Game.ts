import { HandControllerProvider } from "./Hands/HandControllerProvider";
import { AsyncHelper } from "./Helpers/AsyncHelper";
import { GameContext, GameMiddleware } from "./GameTypes";
import { GameRenderer } from "./GameRenderer";
import { HandDetector } from "./Hands/HandDetector";
import { HandMouseDetector } from "./Hands/HandMouseDetector";
import { LevelMiddleware } from "./LevelMiddleware";
import { StartLevel } from "./Game/Levels/StartLevel";

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
            detection: [],
            level: new StartLevel(canvas)
        }
        this.middleware = [
            new HandMouseDetector(canvas),
            //new HandDetector(video),
            new HandControllerProvider(),
            new LevelMiddleware()
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
