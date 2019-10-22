const theme = {
    background: '#000000', // The main background color.
    backgroundGrid: '#101010', // You can draw a small background grid as well.
    primary: null, // Color of the falling blocks. This overrides the standard block color.
    secondary: null, // Color of the placed blocks. This overrides the standard block color.
    stroke: "#ffffff", // Border color for the blocks.
    innerStroke: null, // A small border inside the blocks to give some texture.

    complexBlocks: {
        line: ['src/blockrain/assets/blocks/custom/line_button.png',],
        square: 'src/blockrain/assets/blocks/custom/square_spinner.png',
        arrow: 'src/blockrain/assets/blocks/custom/arrow.png',
        rightHook: 'src/blockrain/assets/blocks/custom/rightHook.png',
        leftHook: 'src/blockrain/assets/blocks/custom/leftHook_radio.png',
        rightZag: 'src/blockrain/assets/blocks/custom/rightZag_toggle_1.png',
        leftZag: 'src/blockrain/assets/blocks/custom/leftZag.png'
    }
}

const config = {
    theme
}

// $(".game").css({width: window.innerHeight/2, height: window.innerHeight - 100})

// $('.game').blockrain(config);