import { Board } from "./Board";
import { Drawer } from "./Drawer";
import { animate } from "./Utils";
import { createCanvasElement, createVideoCapture } from "../utils";
import { PoseDetectorBase } from "../Detection/PoseDetectorBase";
import { SinglePoseDetector } from "../Detection/SinglePoseDetector";
import { PoseEstimator } from "../Detection/PoseEstimator";
import { OpacityDrawer } from "../Drawing/OpacityDrawer";
import { EstimationDrawer } from "../Drawing/EstimationDrawer";
import { ClearDrawer } from "../Drawing/ClearDrawer";
import { MultiPoseDetector } from "../Detection/MultiPoseDetector";

export interface Config {
    height: number;
    width: number;
}


export class Game {
    private readonly gameCanvas: HTMLCanvasElement;
    private readonly detectorCanvas: HTMLCanvasElement;
    public readonly board: Board;
    private readonly drawer: Drawer;
    private detector: PoseDetectorBase | null = null;
    private estimator: PoseEstimator | null = null;

    constructor(config: Config) {
        const height = window.innerHeight;
        const width = height / config.height * config.width;
        this.gameCanvas = createCanvasElement({ width, height }, "absolute");
        this.detectorCanvas = createCanvasElement({ width: window.innerWidth, height: window.innerHeight });
        this.board = new Board(config.width, config.height);
        this.drawer = new Drawer(this.gameCanvas, config);
    }

    start = async (): Promise<void> => {
        const video = await createVideoCapture({ width: window.innerWidth, height: window.innerHeight });
        document.body.append(this.gameCanvas);
        document.body.append(this.detectorCanvas);
        document.body.append(video);
        this.detector = new MultiPoseDetector(video);
        this.estimator = new PoseEstimator(this.detector, { deadZoneRadious: 15 });
        const drawers = [
            new ClearDrawer(this.detectorCanvas),
            new EstimationDrawer(this.detectorCanvas)
        ]
        this.estimator.register(poses => drawers.forEach(d => d.draw(poses)));
        this.estimator.start();

        // animate(() => {
        //     this.board.drop();
        //     this.drawer.draw(this.board);
        // }, 1000)

        // window.addEventListener("keydown", e => {
        //     switch (e.keyCode) {
        //         case 37: /*left*/   this.board.move("left"); break;
        //         case 39: /*right*/  this.board.move("right"); break;
        //         case 40: /*down*/   this.board.drop(); break;
        //         case 38: /*up*/     this.board.rotate(); break;
        //     }
        //     this.drawer.draw(this.board);
        // });
    }
}