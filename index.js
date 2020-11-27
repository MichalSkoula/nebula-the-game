"use strict";

import * as tools from './modules/tools.js';
import * as Canvas from './modules/Canvas.js';
import * as Player from './modules/Player.js';
import * as Maps from './modules/Maps.js';

window.game = {
    tile: 20, // in px
    fps: 30,
    clickX: -1,
    clickY: -1,
    hoverX: -1,
    hoverY: -1,
    offsetX: 0,
    offsetY: 0,
    screenWidth: 96,
    screenHeight: 42,
    canvas: canvas,
    map: new Maps.First()
};

window.canvas = new Canvas.Canvas();
canvas.keepAspectRatio();
canvas.registerControls();

var player = new Player.Player();

function loop() {
    if (game.clickX > -1 && game.clickY > -1) {
        player.click();
        canvas.click();
    }

    // draw
    canvas.clear();
    canvas.drawMap();
    player.draw();
}

setInterval(function(){ 
    loop();
}, 1000 / game.fps);
