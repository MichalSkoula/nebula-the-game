"use strict";

import * as tools from './modules/tools.js';
import { Canvas } from './modules/Canvas.js';
import { Controls } from './modules/Controls.js';
import { Player } from './modules/Player.js';
import * as Maps from './modules/Maps.js';
import { Game } from './modules/Game.js';
import { Enemy } from './modules/Enemy.js';

window.game = new Game(new Maps.First());
window.canvas = new Canvas();
window.player = new Player();
window.controls = new Controls();

window.enemies = [];
window.enemies.push(new Enemy());

function loop() {
    // loop
    player.loop();
    controls.loop();

    // draw
    canvas.clear();
    game.draw();
    controls.draw();
    player.draw();
}

// start 
game.load();

// loop
setInterval(function(){ 
    loop();
}, 1000 / game.fps);
