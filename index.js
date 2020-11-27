"use strict";

import * as tools from './modules/tools.js';
import * as Canvas from './modules/Canvas.js';
import * as Player from './modules/Player.js';
import * as Maps from './modules/Maps.js';

window.game = {
    tile: 20,
    fps: 30,
    clickX: -1,
    clickY: -1,
    canvas: new Canvas.Canvas(),
    map: new Maps.First()
};

var player = new Player.Player();

function loop() {
    if (game.clickX > -1 && game.clickY > -1) {
        player.click();
        game.canvas.click();
    }

    // draw
    game.canvas.clear();
    game.canvas.drawMap();
    player.draw();
}

setInterval(function(){ 
    loop();
}, 1000 / game.fps);
loop();
