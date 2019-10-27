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
}
.absolute {
    position: absolute;
}
`;


document.addEventListener("DOMContentLoaded", async () => {
    const style = createHtmlStyle(css);
    document.body.append(style);
    const canvas = HtmlHelper.createCanvas(window.innerWidth, window.innerHeight);
    const video = HtmlHelper.createVideo(window.innerWidth, window.innerHeight, { display: "none", transform: "scale(-1)" });
    HtmlHelper.linkCameraInput(video);
    document.body.append(video);
    document.body.append(canvas);
    const game = new Game(canvas, video);
    game.start();
})