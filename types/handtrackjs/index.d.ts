declare module "handtrackjs" {
    export interface Prediction {
        bbox: [number, number, number, number];
        class: "hand";
        score: number;
    }

    export interface Model {
        detect(element: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<Prediction[]>
    }

    export interface ModelParams {
        flipHorizontal?: boolean;
        imageScaleFactor?: number;
        maxNumBoxes?: number;
        iouThershold?: number;
        scoreThreshold?: number;
    }

    export function load(params?: ModelParams): Promise<Model>;

}