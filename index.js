"use strict";

import * as tools from './modules/tools.js';
import { Canvas } from './modules/Canvas.js';
import { Controls } from './modules/Controls.js';
import { Player } from './modules/Player.js';
import * as Maps from './modules/Maps.js';
import { Game } from './modules/Game.js';

window.game = new Game(new Maps.First());
window.canvas = new Canvas();
window.player = new Player();
window.controls = new Controls();

function loop() {
    // loop
    player.loop();
    controls.loop();

    // draw
    canvas.clear();
    canvas.drawMap();
    
    controls.draw();
    player.draw();
    canvas.drawStats();
}

// start 
game.load();

// loop
setInterval(function(){ 
    loop();
}, 1000 / game.fps);
