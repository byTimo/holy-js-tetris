import * as posenet from "@tensorflow-models/posenet";
import { ModelConfig } from "@tensorflow-models/posenet/dist/posenet_model";
import { PoseDrawer } from "./PoseDrawer";

export type SkeletonePose = posenet.Pose & {
    segments: posenet.Keypoint[][];
}

export class PoseDetector {
    private drawer: PoseDrawer;
    private network: posenet.PoseNet | null = null;
    private previous: SkeletonePose | null = null;

    constructor(private canvas: HTMLCanvasElement, private video: HTMLVideoElement) {
        this.drawer = new PoseDrawer(this.canvas);
    }

    public start = async (): Promise<void> => {
        const pose = await this.detect() || this.previous;
        if (pose != null) {
            this.previous = pose;
            this.drawer.draw(this.previous);
        }

        requestAnimationFrame(this.start);
    }

    private detect = async (): Promise<SkeletonePose | null> => {
        const network = await this.getNetwork();

        const poses = await network.estimatePoses(this.video, {
            flipHorizontal: true,
            decodingMethod: 'multi-person',
            maxDetections: 2
        });
        const pose = poses[0];

        const minPoseConfidence = 0.3;
        const minPartConfidence = 0.7;

        if (pose.score < minPoseConfidence) {
            return null;
        }

        const segments = posenet.getAdjacentKeyPoints(pose.keypoints, minPartConfidence)
        pose.keypoints = pose.keypoints.filter(x => x.score >= minPartConfidence);
        return {
            ...pose,
            segments
        }
    }

    private getNetwork = async (): Promise<posenet.PoseNet> => {
        if (!this.network) {
            this.network = await this.configurePosenet();
        }

        return this.network;
    }

    private configurePosenet = (): Promise<posenet.PoseNet> => {
        const config: ModelConfig = {
            architecture: 'MobileNetV1',
            outputStride: 16,
            inputResolution: 449,
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