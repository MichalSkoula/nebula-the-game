import * as screen from './modules/screen.js';
import * as canvas from './modules/canvas.js';
import * as tools from './modules/tools.js';
import * as vue from './node_modules/vue/dist/vue.runtime.esm-browser.js';

screen.resize();
canvas.init();

setInterval(function(){ 
    canvas.clear();
    canvas.drawRect(tools.random(10, 1800), 100, 150, 150, 'green');
}, 33);

