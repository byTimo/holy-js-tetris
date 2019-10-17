import {PoseDetector} from "../src/PoseDetector";

const videoWidth = 600;
const videoHeight = 500;

const createCanvasElement = (): HTMLCanvasElement => {
    const canvas = document.createElement("canvas")
    canvas.setAttribute("id", "posenet")
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    return canvas;
}

const createVideoElement = (): HTMLVideoElement => {
    const video = document.createElement("video");
    video.setAttribute("playsinline", "true");
    video.style.display = "none";
    video.style.transform = "scale(-1)"
    return video;
}

const configureCameraCapture = async(video: HTMLVideoElement): Promise<void> => {
    video.width = videoWidth;
    video.height = videoHeight;

    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
            width: videoWidth,
            height: videoHeight,
        },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            video.play();
            resolve();
        };
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const canvas = createCanvasElement();
    const video  =createVideoElement();
    document.body.appendChild(canvas);
    document.body.appendChild(video);

    await configureCameraCapture(video);

    const detector = new PoseDetector(canvas, video);
    detector.start();
})