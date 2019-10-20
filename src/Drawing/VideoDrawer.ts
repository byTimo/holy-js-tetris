import { DrawerBase } from "./DrawerBase";

export class VideoDrawwer extends DrawerBase {
    constructor(canvas: HTMLCanvasElement, private video: HTMLVideoElement){
        super(canvas);
    }

    public draw = () => {
        this.clear();
        if (this.video) {
            this.drawVideo(this.video);
        }
    }
}