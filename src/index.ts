import { createStyle as createHtmlStyle, HtmlHelper } from "./Helpers/HtmlHelpers";
import { Game } from "./Game";

const css = `
html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    background: black;
}
body {
    display: flex;
    justify-content: center;
    align-items: center;
}
.absolute {
    position: absolute;
}
`;


document.addEventListener("DOMContentLoaded", async () => {
    const style = createHtmlStyle(css);
    document.body.append(style);
    const ratio = window.innerWidth / window.innerHeight;
    const canvas = HtmlHelper.createCanvas(window.innerWidth - 200, window.innerHeight - 200/ratio);
    const video = HtmlHelper.createVideo(window.innerWidth, window.innerHeight, { display: "none", transform: "scale(-1)" });
    HtmlHelper.linkCameraInput(video);
    document.body.append(video);
    document.body.append(canvas);
    const game = new Game(canvas, video);
    game.start();
})