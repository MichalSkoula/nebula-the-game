"use strict";

import * as tools from './modules/tools.js';
import { Canvas } from './modules/Canvas.js';
import { Menu } from './modules/Menu.js';
import { Player } from './modules/Player.js';
import * as Maps from './modules/Maps.js';

window.game = {
    tile: 20, // in px
    fps: 10,
    clickX: -1,
    clickY: -1,
    hoverX: -1,
    hoverY: -1,
    offsetX: 0,
    offsetY: 0,
    screenWidth: 96,
    screenHeight: 42,
    menuHeight: 12,
    canvas: canvas,
    map: new Maps.First()
};

window.canvas = new Canvas();
canvas.registerControls();

window.player = new Player();

window.menu = new Menu();

function loop() {
    // click
    if (game.clickX > -1 && game.clickY > -1) {
        player.click();
        menu.click();

        canvas.click(); // reset
    }

    // loop
    player.loop();

    // draw
    canvas.clear();
    canvas.drawMap();
    player.draw();
    menu.draw();
}

// start 
player.load();

// loop
setInterval(function(){ 
    loop();
}, 1000 / game.fps);
