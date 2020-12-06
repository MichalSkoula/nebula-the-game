import { Button } from './Button.js';
import * as tools from './tools.js';

export class Controls {
    constructor() {
        // mouse click coords
        canvas.canvasEl.addEventListener('click', function(e) {
            game.clickX = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile) + game.offsetX;
            game.clickY = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile) + game.offsetY;
        }, false);

        // mouse position
        canvas.canvasEl.addEventListener('mousemove', function(e) {
            game.hoverX = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile);
            game.hoverY = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile);
        }, false);

        // map scroll - keys
        document.addEventListener('keydown', function(e) {
            if (e.key == 'ArrowUp' && game.offsetY > 0) {
                game.offsetY -= 1;
            } else if (e.key == 'ArrowRight' && game.offsetX < game.map.size - game.screenWidth) {
                game.offsetX += 1;
            } else if (e.key == 'ArrowDown' && game.offsetY < game.map.size - game.screenHeight) {
                game.offsetY += 1;
            } else if (e.key == 'ArrowLeft' && game.offsetX > 0) {
                game.offsetX -= 1;
            }
        }, false);
    }

    buttons = [
        new Button(
            'pink',
            'black',
            'SAVE',
            'save',
            1,
            1,
        ),
        new Button(
            'pink',
            'black',
            'LOAD',
            'load',
            1,
            5,
        ),
    ]

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
            if (!button.active) {
                return;
            }

            button.draw();
        });
    }

    loop() {
        // menu click
        if (game.clickY > game.screenHeight) {
            this.buttons.forEach((button) => {
                if (!button.active) {
                    return;
                }

                if (tools.clickInsideMenuButton(game.clickX, game.clickY, button)) {
                    button.performClick();                  
                }
            });
        }

        // mouse hover on the edge - move map
        if (game.hoverY <= 2 && game.offsetY > 0) {
            game.offsetY -= 1;
        } else if (game.hoverX >= game.screenWidth - 3 && game.offsetX < game.map.size - game.screenWidth) {
            game.offsetX += 1;
        } else if (game.hoverY >= game.screenHeight - 3 && game.hoverY < game.screenHeight && game.offsetY < game.map.size - game.screenHeight) {
            game.offsetY += 1;
        } else if (game.hoverX <= 2 && game.offsetX > 0) {
            game.offsetX -= 1;
        }
    }
}
