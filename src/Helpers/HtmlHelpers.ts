export class HtmlHelper {
    static createCanvas = (width: number, height: number, style?: Partial<HTMLCanvasElement["style"]>): HTMLCanvasElement => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        if (style) {
            HtmlHelper.setStyle(canvas, style);
        }
        return canvas;
    }

    static createVideo = (width: number, height: number, style?: Partial<HTMLVideoElement["style"]>): HTMLVideoElement => {
        const video = document.createElement("video");
        video.width = width;
        video.height = height;
        video.setAttribute("playsinline", "true");
        if(style) {
            HtmlHelper.setStyle(video, style);
        }
        return video;
    }

    static linkCameraInput = async (video: HTMLVideoElement): Promise<void> => {
        const stream = await navigator.mediaDevices.getUserMedia({
            "audio": false,
            "video": {
                width: video.width,
                height: video.height
            }
        });
        video.srcObject = stream;

        return new Promise((resolve) => {
            video.onloadedmetadata = () => {
                video.play();
                resolve();
            };
        });
    }


    static setStyle = (element: HTMLElement, style: Partial<HTMLElement["style"]>) => {
        for (const key of Object.keys(style) as Array<any>) {
            (element.style as any)[key] = style[key];
        }
    }
}

export const createStyle = (content: string): HTMLStyleElement => {
    const style = document.createElement("style");
    style.innerHTML = content;
    return style;
};
