import { createCanvasElement, createVideoCapture } from "./utils";
import { SinglePoseDetector } from "./Detection/SinglePoseDetector";
import { PoseDetectorBase } from "./Detection/PoseDetectorBase";
import { VideoDrawwer } from "./Drawing/VideoDrawer";
import { DrawerBase } from "./Drawing/DrawerBase";
import { PoseSkeletonDrawer } from "./Drawing/PoseSkeletonDrawer";
import { ZoneDrawer } from "./Drawing/ZoneDrawer";

let detector: PoseDetectorBase | null = null;
const resolution = { width: 600, height: 480 };


document.addEventListener("DOMContentLoaded", async () => {
    const canvas = createCanvasElement(resolution);
    const video = await createVideoCapture(resolution);
    document.body.appendChild(canvas);
    document.body.appendChild(video);

    detector = new SinglePoseDetector(video);
    const drawser: DrawerBase[] = [
        new VideoDrawwer(canvas, video),
        new PoseSkeletonDrawer(canvas),
        new ZoneDrawer(canvas)
    ];

    detector.register(poses => {
        drawser.forEach(x => x.draw(poses))
    })

    detector.start();
})