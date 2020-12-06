"use strict";

import * as tools from './modules/tools.js';
import { Canvas } from './modules/Canvas.js';
import { Controls } from './modules/Controls.js';
import { Player } from './modules/Player.js';
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
    menuHeight: 12,
    map: new Maps.First()
};

window.canvas = new Canvas();
window.player = new Player();
window.controls = new Controls();

function loop() {
    // loop
    player.loop();
    controls.loop();
    canvas.loop();

    // draw
    canvas.clear();
    canvas.drawMap();
    player.draw();
    controls.draw();
}

// start 
player.load();

// loop
setInterval(function(){ 
    loop();
}, 1000 / game.fps);
