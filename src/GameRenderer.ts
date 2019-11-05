import { GameContext, RenderMiddleware } from "./GameTypes";
import { HandRenderer } from "./Hands/HandRenderer";
import { RenderHelper } from "./Helpers/RenderHelper";
import { PlayLevelRenderer } from "./Game/PlayLevelRenderer";
import { PlayLevel } from "./Game/Levels/PlayLevel";
import { StartLevelRenderer } from "./Game/StartLevelRenderer";
import { ResultLevelRenderer } from "./Game/ResultLevelRenderer";

const renderVideo = true;

export class GameRenderer {
    private readonly ctx: CanvasRenderingContext2D;
    private middlewares: RenderMiddleware[];
    constructor(private readonly canvas: HTMLCanvasElement, private video: HTMLVideoElement) {
        this.ctx = canvas.getContext("2d")!;
        this.middlewares = [
            new StartLevelRenderer(),
            new PlayLevelRenderer(),
            new ResultLevelRenderer(),
            new HandRenderer()
        ]
    }

    render = (context: GameContext) => {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (renderVideo) {
            RenderHelper.renderVideo(this.ctx, this.video, this.canvas);
        }

        for (const middleware of this.middlewares) {
            middleware.render(this.ctx, context);
        }
    }
}