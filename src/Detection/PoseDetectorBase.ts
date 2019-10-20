import * as posenet from "@tensorflow-models/posenet";
import { ModelConfig } from "@tensorflow-models/posenet/dist/posenet_model";

export type SkeletonePose = posenet.Pose & {
    segments: posenet.Keypoint[][];
}

export type DetectionHandler = (poses: SkeletonePose[]) => void;

export abstract class PoseDetectorBase {
    protected network: posenet.PoseNet | null = null;
    private readonly handlers: Set<DetectionHandler> = new Set();
    protected enabled: boolean = false;

    constructor(protected video: HTMLVideoElement) {
    }

    public register = (handler: DetectionHandler) => {
        this.handlers.add(handler);
    }

    public unregister = (handler: DetectionHandler) => {
        this.handlers.delete(handler);
    }

    public start = () => {
        this.enabled = true;
        this.detectInternal();
    }

    private detectInternal = async () => {
        const poses = await this.detect();

        for (const handle of this.handlers) {
            handle(poses);
        }

        if (this.enabled) {
            requestAnimationFrame(this.detectInternal);
        }
    }

    public stop = () => {
        this.enabled = false;
    }

    protected abstract detect: () => Promise<SkeletonePose[]>
    
    protected getNetwork = async (): Promise<posenet.PoseNet> => {
        if (!this.network) {
            this.network = await this.configurePosenet();
        }

        return this.network;
    }

    private configurePosenet = (): Promise<posenet.PoseNet> => {
        const config: ModelConfig = {
            architecture: 'MobileNetV1',
            outputStride: 8,
            inputResolution: 321,
            multiplier: 0.75,
        }

        // const config: ModelConfig = {
        //     architecture: "ResNet50",
        //     outputStride: 16,
        //     inputResolution: 257,
        //     quantBytes: 2
        // }

        return posenet.load(config);
    }
}