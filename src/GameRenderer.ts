import { GameContext, RenderMiddleware } from "./GameTypes";
import { HandRenderer } from "./Hands/HandRenderer";
import { RenderHelper } from "./Helpers/RenderHelper";
import { PlayLevelRenderer } from "./Game/PlayLevelRenderer";
import { PlayLevel } from "./Game/PlayLevel";

const renderVideo = true;

export class GameRenderer {
    private readonly ctx: CanvasRenderingContext2D;
    private middlewares: RenderMiddleware[];
    constructor(private readonly canvas: HTMLCanvasElement, private video: HTMLVideoElement, level: PlayLevel) {
        this.ctx = canvas.getContext("2d")!;
        this.middlewares = [
            new PlayLevelRenderer(level),
            new HandRenderer()
        ]
    }

    render = (context: GameContext) => {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (renderVideo) {
            RenderHelper.renderVideo(this.ctx, this.video, this.canvas.width);
        }

        for (const middleware of this.middlewares) {
            middleware.render(this.ctx, context);
        }
    }
}