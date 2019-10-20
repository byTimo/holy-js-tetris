import { PoseDetectorBase } from "./PoseDetectorBase";
import * as posenet from "@tensorflow-models/posenet";

export class SinglePoseDetector extends PoseDetectorBase {
    protected detect = async () => {
        const network = await this.getNetwork();

        // const poses = await network.estimatePoses(this.video, {
        //     flipHorizontal: true,
        //     decodingMethod: 'multi-person',
        //     maxDetections: 2
        // });

        const poses = [await network.estimateSinglePose(this.video, {
            flipHorizontal: true,
        })];

        const minPoseConfidence = 0.3;
        const minPartConfidence = 0.5;

        return poses.filter(pose => pose.score >= minPoseConfidence)
            .map(pose => {
                const segments = posenet.getAdjacentKeyPoints(pose.keypoints, minPartConfidence)
                pose.keypoints = pose.keypoints.filter(x => x.score >= minPartConfidence);
                return {
                    ...pose,
                    segments
                }
            })
    }
}