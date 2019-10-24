import * as handtrack from "handtrackjs";
import { Emitter } from "./Emitter";

export interface Hand {
    x: number;
    y: number;
    width: number;
    height: number;
    mx: number;
    my: number;
    score: number;
}

export class HandDetector extends Emitter<Hand[]> {
    constructor(private video: HTMLVideoElement) {
        super();
    }


    detect = async () => {
        const model = await handtrack.load({
            flipHorizontal: true,
            maxNumBoxes: 5,
            scoreThreshold: 0.85
        });
        this.detectInternal(model);
    }

    private detectInternal = async (model: handtrack.Model) => {
        const preditions = await model.detect(this.video);

        const hands: Hand[] = preditions.map(p => {
            const [x, y, width, height] = p.bbox;
            const mx = x + width / 2, my = y + height / 2;
            return { x, y, width, height, mx, my, score: p.score };
        })

        this.emit(hands);

        requestAnimationFrame(() => this.detectInternal(model));
    }
}