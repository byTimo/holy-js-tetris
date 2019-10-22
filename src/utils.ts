export interface Resolution {
    width: number;
    height: number;
}

export const setStyle = (element: HTMLElement, style: Partial<typeof element.style>): void => {
    for (const key of Object.keys(style) as Array<any>) {
        (element.style as any)[key] = style[key]
    }
}


export const createCanvasElement = ({ width, height }: Resolution, classes?: string): HTMLCanvasElement => {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height;
    if (classes) {
        canvas.setAttribute("class", classes)
    }
    return canvas;
}

export const createVideoCapture = async ({ width, height }: Resolution): Promise<HTMLVideoElement> => {
    const video = document.createElement("video");
    video.width = width;
    video.height = height;
    video.setAttribute("playsinline", "true");
    setStyle(video, {
        display: "none",
        transform: "scale(-1)"
    });
    await configureCameraCapture(video);
    return video;
}

const configureCameraCapture = async (video: HTMLVideoElement): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
            width: video.width,
            height: video.height,
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

export const createStyle = (content: string): HTMLStyleElement => {
    const style = document.createElement("style");
    style.innerHTML = content;
    return style;
}