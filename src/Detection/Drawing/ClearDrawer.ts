import { DrawerBase } from "./DrawerBase";
import { EstimatedPose } from "../PoseEstimator";
export class ClearDrawer extends DrawerBase {
    public draw = (poses: EstimatedPose[]): void => {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
}
