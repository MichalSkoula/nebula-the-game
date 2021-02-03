import { Button } from './Button.js';
import { Minimap } from './Minimap.js';
import * as tools from './tools.js';

export class Controls {
    constructor() {
        this.keymap = {};
        this.resetSelection();

        // mouse click coords
        canvas.canvasEl.addEventListener('click', function(e) {
            game.clickXViewportPrecise = ((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile;
            game.clickYViewportPrecise = ((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile;

            game.clickXViewport = Math.floor(game.clickXViewportPrecise);
            game.clickYViewport = Math.floor(game.clickYViewportPrecise);
            
            game.clickX = game.clickXViewport + game.offsetX;
            game.clickY = game.clickYViewport + game.offsetY;
            console.log("clicked on ", game.clickX, game.clickY);
        }, false);

        // mouse right click coords
        canvas.canvasEl.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            game.clickXRight = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile) + game.offsetX;
            game.clickYRight = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile) + game.offsetY;
        }, false);

        // mouse position
        canvas.canvasEl.addEventListener('mousemove', function(e) {
            game.hoverXViewport = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile);
            game.hoverYViewport = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile);

            game.hoverX = game.hoverXViewport + game.offsetX;
            game.hoverY = game.hoverYViewport + game.offsetY;
        }, false);

        // mouse selection 
        canvas.canvasEl.addEventListener('mousedown', function(e) {
            game.selection.x = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile) + game.offsetX;
            game.selection.y = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile) + game.offsetY;
            
            canvas.canvasEl.addEventListener('mouseup', canvas.selectionListener = function selectionListener(e) {
                game.selection.width = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile) + game.offsetX - game.selection.x;
                game.selection.height = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile) + game.offsetY - game.selection.y;
                
                if (game.selection.width < 0) {
                    game.selection.x += game.selection.width;
                    game.selection.width = -game.selection.width;
                }

                if (game.selection.height < 0) {
                    game.selection.y += game.selection.height;
                    game.selection.height = -game.selection.height;
                }

                canvas.canvasEl.removeEventListener('mouseup', selectionListener, false);
            });
        });

        // keyboard
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

            // delete
            if (controls.keymap[46]) {
                player.keyDelete();
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
            '+ UNIT',
            'unit',
            7,
            1,
            8,
            1.5,
            false
        ),
        new Button(
            'pink',
            game.fontColor,
            '+ BUILDING',
            'building',
            7,
            1,
            9,
            1.5,
            true
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
            '#422390'
        );
    
        // menu buttons
        this.buttons.forEach((button) => {
            button.draw();
        });

        // minimap 
        this.minimap.draw();

        // selected 
        canvas.drawRect(
            game.selectionOffsetX,
            game.selectionOffsetY, 
            game.selectionWidth,
            game.selectionHeight,
            '#8B2AA6'
        );

        // selected grid 
        for (let i = game.selectionOffsetX; i <= game.selectionWidth + game.selectionOffsetX; i++) {
            if (i % 2 == 0) {
                canvas.drawLine(i, game.selectionOffsetY, i, game.selectionOffsetY + game.selectionHeight, game.map.colors.grid, 0.4);
            }
        }
        for (let i = game.selectionOffsetY; i <= game.selectionOffsetY + game.selectionHeight; i++) {
            if (i % 2 == 0) { 
                canvas.drawLine(game.selectionOffsetX, i, game.selectionOffsetX + game.selectionWidth, i, game.map.colors.grid, 0.4);
            }
        }

        // resources
        canvas.drawText(45, 1.5 + game.screenHeight, "GOLD: " + player.storage.resources.gold, game.fontColorInvert, 1);

        // stats
        canvas.drawText(45, 3.5 + game.screenHeight, "SCORE: " + player.storage.score, game.fontColorInvert, 1);
        canvas.drawText(45, 4.5 + game.screenHeight, "UNITS: " + player.storage.units.length, game.fontColorInvert, 1);

        // selection hover in progress
        if (game.selection.x !== false 
            && game.selection.width === false 
            && game.selection.x != game.hoverX 
            && game.selection.y != game.hoverY
        ) {
            canvas.drawRect(
                game.selection.x - game.offsetX,
                game.selection.y - game.offsetY,
                game.hoverX - game.selection.x,
                game.hoverY - game.selection.y,
                '#A5B9ED',
                0.3
            );
            canvas.drawRectEmpty(
                game.selection.x - game.offsetX,
                game.selection.y - game.offsetY,
                game.hoverX - game.selection.x,
                game.hoverY - game.selection.y,
                '#606DAE',
                5
            );
        }

        // menu border
        canvas.drawLine(
            0,
            game.screenHeight,
            game.screenWidth,
            game.screenHeight,
            '#252C40',
            5
        );
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
        this.resetSelection();
        

        // mouse hover on the edge - move map
        // for development purpuses commented out
        /*
        if (game.hoverYViewport <= 2 && game.offsetY > 0) {
            game.offsetY -= 1;
        } else if (game.hoverXViewport >= game.screenWidth - 3 && game.offsetX < game.map.size - game.screenWidth) {
            game.offsetX += 1;
        } else if (game.hoverYViewport >= (game.screenHeight + game.menuHeight) - 3 && game.hoverYViewport < (game.screenHeight + game.menuHeight) && game.offsetY < game.map.size - game.screenHeight) {
            game.offsetY += 1;
        } else if (game.hoverXViewport <= 2 && game.offsetX > 0) {
            game.offsetX -= 1;
        }
        */
    }

    resetSelection() {
        if (game.selection.width === false && game.selection.height === false) {
            return;
        }

        game.selection = {
            x: false,
            y: false,
            width: false,
            height: false
        };
    }
}
