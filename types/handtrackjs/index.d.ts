declare module "handtrackjs" {
    import {Tensor, Rank} from "@tensorflow/tfjs";

    export interface Prediction {
        bbox: [number, number, number, number];
        class: "hand";
        score: number;
    }

    export interface Model {
        detect(element: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | Tensor<Rank>): Promise<Prediction[]>
    }

    export interface ModelParams {
        flipHorizontal?: boolean;
        imageScaleFactor?: number;
        maxNumBoxes?: number;
        iouThreshold?: number;
        scoreThreshold?: number;
        outputStride?: number;
    }

    export function load(params?: ModelParams): Promise<Model>;

}