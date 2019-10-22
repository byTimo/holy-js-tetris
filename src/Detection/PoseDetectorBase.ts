import * as posenet from "@tensorflow-models/posenet";
import { ModelConfig } from "@tensorflow-models/posenet/dist/posenet_model";
import { Emitter } from "./Emitter";

export type DetectionHandler = (poses: posenet.Pose) => void;

export abstract class PoseDetectorBase extends Emitter<posenet.Pose[]> {
    protected network: posenet.PoseNet | null = null;
    protected enabled: boolean = false;

    constructor(protected video: HTMLVideoElement) {
        super();
    }

    public start = () => {
        this.enabled = true;
        this.detectInternal();
    }

    private detectInternal = async () => {
        const poses = await this.detect();

        this.emit(poses)

        if (this.enabled) {
            requestAnimationFrame(this.detectInternal);
        }
    }

    public stop = () => {
        this.enabled = false;
    }

    protected abstract detect: () => Promise<posenet.Pose[]>
    
    protected getNetwork = async (): Promise<posenet.PoseNet> => {
        if (!this.network) {
            this.network = await this.configurePosenet();
        }

        return this.network;
    }

    private configurePosenet = (): Promise<posenet.PoseNet> => {
        // const config: ModelConfig = {
        //     architecture: 'MobileNetV1',
        //     outputStride: 8,
        //     inputResolution: 321,
        //     multiplier: 0.75,
        // }

        const config: ModelConfig = {
            architecture: "ResNet50",
            outputStride: 16,
            inputResolution: 257,
            quantBytes: 2
        }

        return posenet.load(config);
    }
}