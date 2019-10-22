import { createStyle } from "./utils";
import { Game } from "./Game/Game";

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
    const style = createStyle(css);
    document.body.append(style);
    const game = new Game({ width: 10, height: 16 });
    game.start();
})