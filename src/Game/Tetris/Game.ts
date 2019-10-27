// import { Board } from "./Board";
// import { createCanvasElement, createVideoCapture } from "../../Helpers/HtmlHelpers";

// export interface Config {
//     height: number;
//     width: number;
// }


// export class Game {
//     private readonly gameCanvas: HTMLCanvasElement;
//     private readonly detectorCanvas: HTMLCanvasElement;
//     public readonly board: Board;

//     constructor(config: Config) {
//         const height = window.innerHeight;
//         const width = height / config.height * config.width;
//         this.gameCanvas = createCanvasElement(width, height, "absolute");
//         this.detectorCanvas = createCanvasElement(window.innerWidth, window.innerHeight);
//         this.board = new Board(config.width, config.height);
//     }

//     start = async (): Promise<void> => {
//         // const video = await createVideoCapture(window.innerWidth, window.innerHeight);
//         // document.body.append(this.gameCanvas);
//         // document.body.append(this.detectorCanvas);
//         // document.body.append(video);
//         // const hands = new HandsDrawer(this.detectorCanvas, video);

//         // const detector = new HandDetector(video);
//         // detector.register(h => {
//         //     h.length && hands.append(h)
//         // });
//         // await detector.detect();
//         // hands.start();

//         // animate(() => {
//         //     this.board.drop();
//         //     this.drawer.draw(this.board);
//         // }, 1000)

//         // window.addEventListener("keydown", e => {
//         //     switch (e.keyCode) {
//         //         case 37: /*left*/   this.board.move("left"); break;
//         //         case 39: /*right*/  this.board.move("right"); break;
//         //         case 40: /*down*/   this.board.drop(); break;
//         //         case 38: /*up*/     this.board.rotate(); break;
//         //     }
//         //     this.drawer.draw(this.board);
//         // });
//     }
// }