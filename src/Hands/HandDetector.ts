import * as handtrack from "handtrackjs";
import { GameMiddleware, GameContext } from "../GameTypes";
import { HandDetection } from "./Types";
import { ObjectHelper } from "../Helpers/ObjectHelpers";
import { AsyncHelper } from "../Helpers/AsyncHelper";

const maxHand = 10;
let scoreThreshold = 0.7;
const detectionDelay = 5;

const pattern = /threshold=([\d\.]+)/;

export class HandDetector implements GameMiddleware {
    private detection: HandDetection[] = [];
    private model: handtrack.Model | null = null;
    constructor(private video: HTMLVideoElement) {
        this.detect();
        window.addEventListener("hashchange", this.handleParamsChanged)
    }

    invoke = (context: GameContext) => {
        context.detection = this.detection;
    }

    private getModel = async (): Promise<handtrack.Model> => {
        if (!this.model) {
            this.model = await handtrack.load({
                flipHorizontal: true,
                imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
                iouThreshold: 0.5,      // ioU threshold for non-max suppression
                maxNumBoxes: maxHand,
                scoreThreshold: scoreThreshold
            });
        }
        return this.model;
    }

    private detect = async () => {
        const model = await this.getModel();
        const preditions = await model.detect(this.video);

        this.detection = preditions.map<HandDetection>(p => {
            const [x, y, width, height] = p.bbox;
            return ObjectHelper.create(HandDetection, {
                position: { x: x + width / 2, y: y + height / 2 },
                scale: { width, height },
                score: p.score,
                start: { x, y }
            })
        })

        AsyncHelper.animate(this.detect, detectionDelay);
    }

    handleParamsChanged = (e: HashChangeEvent) => {
        const hash = window.location.hash;
        const match = pattern.exec(hash);
        if (match) {
            scoreThreshold = parseFloat(match[1]);
            this.model = null;
        }
    }
}