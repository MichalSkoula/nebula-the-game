import { Button } from './Button.js';
import * as tools from './tools.js';

export class Menu {
    constructor() {

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

    click() {
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
    }
}
