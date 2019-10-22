import { DrawerBase } from "./DrawerBase";
import { EstimatedPose } from "../Detection/PoseEstimator";

export class EstimationDrawer extends DrawerBase<EstimatedPose> {
    public draw = (poses: EstimatedPose[]): void => {
        const pose = poses[0];

        const { leftWrist, rightWrist } = pose.keypoints;

        this.drawPoint(leftWrist.x, leftWrist.y, 25 * leftWrist.score, leftWrist.saved ? "red" : "blue");
        this.drawPoint(rightWrist.x, rightWrist.y, 25 * rightWrist.score, rightWrist.saved ? "red" : "orange");
    }
}