import { Game } from "./Game/Tetris/Game";
import { createStyle as createHtmlStyle } from "./Helpers/HtmlHelpers";

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
    const game = new Game({ width: 10, height: 16 });
    game.start();
})