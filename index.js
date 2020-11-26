import * as screen from './modules/screen.js';
import * as canvas from './modules/canvas.js';

screen.resize();
canvas.init();

canvas.drawRect(10, 10, 150, 100, 'green');
