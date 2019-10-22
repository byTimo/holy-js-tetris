import { DrawerBase } from "./DrawerBase";
import { EstimatedPose, Keypoints, Part } from "../Detection/PoseEstimator";

const colors = [
    "red",
    "blue",
    "yellow",
    "gray",
    "black",
    "green"
];

export class PoseSkeletonDrawer extends DrawerBase {
    public draw = (poses: EstimatedPose[]): void => {
        for (let i = 0; i < poses.length; i++) {
            const pose = poses[i];
            //const segments = getAdjacentKeyPoints(pose.keypoints, 0.5)
            this.drawKeypoints(pose.keypoints, colors[i]);
            //this.drawSkeleton(segments, colors[i]);
        }
    }

    // private drawSkeleton = (segments: Keypoint[][], color: string, scale: number = 1) => {
    //     for (const segment of segments) {
    //         const first: [number, number] = [segment[0].position.x, segment[0].position.y];
    //         const second: [number, number] = [segment[1].position.x, segment[1].position.y];
    //         this.drawSegment(first, second, color, scale)
    //     }
    // }

    private drawKeypoints(keypoints: Keypoints, color: string, scale: number = 1) {
        for (const key of Object.keys(keypoints)) {
            const keypoint = keypoints[key as Part];
            const { y, x } = keypoint;
            this.drawPoint(x * scale, y * scale, 3, color);
        }
    }
}