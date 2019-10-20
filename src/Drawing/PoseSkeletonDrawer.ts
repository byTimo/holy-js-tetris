import { Keypoint } from "@tensorflow-models/posenet";
import { DrawerBase } from "./DrawerBase";
import { SkeletonePose } from "../Detection/PoseDetectorBase";

const colors = [
    "red",
    "blue",
    "yellow",
    "gray",
    "black",
    "green"
];

export class PoseSkeletonDrawer extends DrawerBase {
    public draw = (poses: SkeletonePose[]): void => {
        for (let i = 0; i < poses.length; i++) {
            const pose = poses[i];
            this.drawKeypoints(pose.keypoints, colors[i]);
            this.drawSkeleton(pose.segments, colors[i]);
        }
    }

    private drawSkeleton = (segments: Keypoint[][], color: string, scale: number = 1) => {
        for (const segment of segments) {
            const first: [number, number] = [segment[0].position.x, segment[0].position.y];
            const second: [number, number] = [segment[1].position.x, segment[1].position.y];
            this.drawSegment(first, second, color, scale)
        }
    }

    private drawKeypoints(keypoints: Keypoint[], color: string, scale: number = 1) {
        for (const keypoint of keypoints) {
            const { y, x } = keypoint.position;
            this.drawPoint(x * scale, y * scale, 3, color);
        }
    }
}