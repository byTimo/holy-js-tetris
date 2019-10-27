import { Board } from "./Board";
import { Point } from "../../Helpers/MathHelpers";

export interface Config {
    width: number;
    height: number;
}

export class Drawer {
    private readonly ctx: CanvasRenderingContext2D;
    private blockWidth: number;
    private blockHeight: number;

    constructor(private canvas: HTMLCanvasElement, private config: Config) {
        this.ctx = this.canvas.getContext("2d")!;
        this.blockWidth = this.canvas.width / (config.width + 1);
        this.blockHeight = this.canvas.height / (config.height + 1);
    }


    public draw = (board: Board) => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const point of board.filled.values()) {
            this.drawPoint({x: point.x + 1, y: point.y}, "red");
        }

        for (const point of board.shape.points) {
            this.drawPoint({ x: point.x + 1, y: point.y }, "blue")
        }

        // for(const point of board.ground.values()){
        //     this.drawPoint({ x: point.x + 1, y: point.y }, "green")
        // }

        // for (const point of board.walls.values()) {
        //     this.drawPoint(point, "black")
        // }
    }

    private drawPoint = ({ x, y }: Point, color: string) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight)
    }
}