"use strict";

import * as tools from './modules/tools.js';
import * as Canvas from './modules/Canvas.js';
//import * as vue from './node_modules/vue/dist/vue.runtime.esm-browser.js';
import * as Player from './modules/Player.js';

window.game = {
    tile: 20,
    fps: 30,
    clickX: -1,
    clickY: -1
};
window.canvas = new Canvas.Canvas();

var player = new Player.Player();

function loop() {
    if (game.clickX > -1 && game.clickY > -1) {
        player.click();
        canvas.click();
    }
    canvas.clear();

    // player
    player.draw();
}

setInterval(function(){ 
    loop();
}, 1000 / game.fps);
loop();
