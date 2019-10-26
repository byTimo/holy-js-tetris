import { DrawerBase } from "./DrawerBase";
import { Part, EstimatedPose } from "../PoseEstimator";

export type Config = Array<{
    parts: Part[],
    color: string
}>;


export class PartDriwer extends DrawerBase {
    constructor(canvas: HTMLCanvasElement, private config: Config) {
        super(canvas);
    }

    draw = (poses: EstimatedPose[]) => {
        throw new Error();
        // for (const config of this.config) {
        //     for (const part of config.parts) {
        //         const keypoint = poses[0].keypoints.find(x => x.part === part);
        //         if (keypoint) {
        //             this.drawPoint(keypoint.position.x, keypoint.position.y, 5 * keypoint.score, config.color)
        //         }
        //     }
        // }
    }
}