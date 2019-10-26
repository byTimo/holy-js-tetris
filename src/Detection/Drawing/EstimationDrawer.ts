import { DrawerBase } from "./DrawerBase";
import { EstimatedPose } from "../PoseEstimator";

const saved: boolean = false

export class EstimationDrawer extends DrawerBase<EstimatedPose> {
    public draw = (poses: EstimatedPose[]): void => {
        if (poses.length === 0) {
            return;
        }

        const pose = poses[0];

        const { leftWrist, rightWrist, leftElbow, leftShoulder, rightElbow, rightShoulder } = pose.keypoints;

        this.drawPoint(leftWrist, 10 * leftWrist.score, leftWrist.saved && saved ? "red" : "blue");
        this.drawPoint(leftElbow, 15 * leftElbow.score, leftElbow.saved && saved ? "red" : "blue");
        this.drawPoint(leftShoulder, 25 * leftShoulder.score, leftShoulder.saved && saved ? "red" : "blue");
        this.drawSegment(leftWrist, leftElbow, "blue", 10);
        this.drawSegment(leftElbow, leftShoulder, "blue", 10);

        this.drawPoint(rightWrist, 10 * rightWrist.score, rightWrist.saved && saved ? "red" : "orange");
        this.drawPoint(rightElbow, 15 * rightElbow.score, rightElbow.saved && saved ? "red" : "orange");
        this.drawPoint(rightShoulder, 25 * rightShoulder.score, rightShoulder.saved && saved ? "red" : "orange");
        this.drawSegment(rightWrist, rightElbow, "orange", 10);
        this.drawSegment(rightElbow, rightShoulder, "orange", 10);
    }
}