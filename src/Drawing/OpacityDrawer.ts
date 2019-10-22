import { DrawerBase } from "./DrawerBase";
import { EstimatedPose } from "../Detection/PoseEstimator";

export class OpacityDrawer extends DrawerBase {
    public draw = (poses: EstimatedPose[]): void => {
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.fillStyle = "rgba(0,0,0,0.1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = "source-over";
    };
}
