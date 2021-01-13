import { Button } from './Button.js';
import { Minimap } from './Minimap.js';
import * as tools from './tools.js';

export class Controls {
    constructor() {
        this.keymap = {};

        // mouse click coords
        canvas.canvasEl.addEventListener('click', function(e) {
            game.clickXViewportPrecise = ((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile;
            game.clickYViewportPrecise = ((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile;

            game.clickXViewport = Math.floor(game.clickXViewportPrecise);
            game.clickYViewport = Math.floor(game.clickYViewportPrecise);
            
            game.clickX = game.clickXViewport + game.offsetX;
            game.clickY = game.clickYViewport + game.offsetY;
        }, false);
        // mouse right click coords
        canvas.canvasEl.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            game.clickXRight = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile) + game.offsetX;
            game.clickYRight = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile) + game.offsetY;
        }, false);

        // mouse position
        canvas.canvasEl.addEventListener('mousemove', function(e) {
            game.hoverX = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile);
            game.hoverY = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile);
        }, false);

        // map scroll - keys
        document.onkeydown = document.onkeyup = function(e) {
            controls.keymap[e.keyCode] = e.type == 'keydown';
            
            if (controls.keymap[38] && game.offsetY > 0) { // up
                game.offsetY -= 1;
            }
            if (controls.keymap[39] && game.offsetX < game.map.size - game.screenWidth) { // right
                game.offsetX += 1;
            }
            if (controls.keymap[40] && game.offsetY < game.map.size - game.screenHeight) { // down
                game.offsetY += 1;
            }
            if (controls.keymap[37] && game.offsetX > 0) { // left
                game.offsetX -= 1;
            }
        }
    }

    buttons = [
        new Button(
            'pink',
            game.fontColor,
            'SAVE',
            'save',
            1,
            1,
        ),
        new Button(
            'pink',
            game.fontColor,
            'LOAD',
            'load',
            1,
            4,
        ),
        new Button(
            'pink',
            game.fontColor,
            'NEW UNIT',
            'unit',
            9,
            1,
            8
        )
    ]

    minimap = new Minimap();

    draw() {
        // menu background
        canvas.drawRect(
            0,
            game.screenHeight, 
            game.screenWidth,
            game.screenHeight + game.menuHeight,
            'DarkSlateBlue'
        )
    
        // menu buttons
        this.buttons.forEach((button) => {
            button.draw();
        });

        // minimap 
        this.minimap.draw();
    }

    loop() {
        // menu click
        if (game.clickYViewport >= game.screenHeight) {
            // buttons click 
            this.buttons.forEach((button) => {
                if (tools.clickInside(game.clickXViewport, game.clickYViewport, button)) {
                    button.performClick();
                }
            });

            // minimap click
            if (tools.clickInside(game.clickXViewport, game.clickYViewport, this.minimap)) {
                this.minimap.moveViewport();
            }
        }

        // reset
        game.clickX = -1;
        game.clickY = -1;
        game.clickXViewport = -1;
        game.clickYViewport = -1;
        game.clickXViewportPrecise = -1;
        game.clickYViewportPrecise = -1;
        game.clickXRight = -1;
        game.clickYRight = -1;

        // mouse hover on the edge - move map
        // for development purpuses commented out
        /*
        if (game.hoverY <= 2 && game.offsetY > 0) {
            game.offsetY -= 1;
        } else if (game.hoverX >= game.screenWidth - 3 && game.offsetX < game.map.size - game.screenWidth) {
            game.offsetX += 1;
        } else if (game.hoverY >= (game.screenHeight + game.menuHeight) - 3 && game.hoverY < (game.screenHeight + game.menuHeight) && game.offsetY < game.map.size - game.screenHeight) {
            game.offsetY += 1;
        } else if (game.hoverX <= 2 && game.offsetX > 0) {
            game.offsetX -= 1;
        }
        */
    }
}
