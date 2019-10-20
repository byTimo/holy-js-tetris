import { DrawerBase } from "./DrawerBase";
import { SkeletonePose } from "../Detection/PoseDetectorBase";

export class ZoneDrawer extends DrawerBase {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
    }

    draw = (poses: SkeletonePose[]) => {
        const wight = this.canvas.width * 0.2;
        this.drawRect([0, 0], [wight, this.canvas.height], "gray")
        this.drawRect([this.canvas.width - wight, 0], [this.canvas.width, this.canvas.height], "gray");
    }
}