import { PoseDetectorBase } from "./PoseDetectorBase";
// const config: ModelConfig = {
        //     architecture: "ResNet50",
        //     outputStride: 16,
        //     inputResolution: 257,
        //     quantBytes: 2
        // }

export class SinglePoseDetector extends PoseDetectorBase {
    constructor(video: HTMLVideoElement) {
        super(video, {
            architecture: 'MobileNetV1',
            outputStride: 8,
            inputResolution: 417,
            multiplier: 0.75,
        })
    }

    protected detect = async () => {
        const network = await this.getNetwork();
        const poses = [await network.estimateSinglePose(this.video, {
            flipHorizontal: true,
        })];

        const minPoseConfidence = 0.1;
        const minPartConfidence = 0.3;

        return poses.filter(pose => pose.score >= minPoseConfidence)
            .map(pose => {
                pose.keypoints = pose.keypoints.filter(x => x.score >= minPartConfidence);
                return pose;
            })
    }
}