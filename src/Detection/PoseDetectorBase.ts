import * as posenet from "@tensorflow-models/posenet";
import { ModelConfig } from "@tensorflow-models/posenet/dist/posenet_model";
import { Emitter } from "./Emitter";

export type DetectionHandler = (poses: posenet.Pose) => void;

export abstract class PoseDetectorBase extends Emitter<posenet.Pose[]> {
    protected network: posenet.PoseNet | null = null;
    protected enabled: boolean = false;

    constructor(protected video: HTMLVideoElement, private config: ModelConfig) {
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
            this.network = await posenet.load(this.config);
        }

        return this.network;
    }
}