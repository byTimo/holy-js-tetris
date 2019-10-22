import { PoseDetectorBase } from "./PoseDetectorBase";

export class MultiPoseDetector extends PoseDetectorBase {
    constructor(video: HTMLVideoElement) {
        super(video, {
            architecture: 'MobileNetV1',
            outputStride: 16,
            inputResolution: 513,
            multiplier: 0.75,
        });
    }
    protected detect = async () => {
        const network = await this.getNetwork();
        const poses = await network.estimateMultiplePoses(this.video, {
            flipHorizontal: true,
            maxDetections: 1,
            nmsRadius: 30,
        });
        const minPoseConfidence = 0.1;
        const minPartConfidence = 0.3;
        return poses.filter(pose => pose.score >= minPoseConfidence)
            .map(pose => {
                pose.keypoints = pose.keypoints.filter(x => x.score >= minPartConfidence);
                return pose;
            });
    };
}
