import * as tools from './tools.js';

export class Unit {
    constructor(x = 2, y = 2, health = 100) {
        this.health = health;
        this.x = x
        this.y = y;
        this.width = 1;
        this.height = 1;
        this.selected = false;

        this.actualPath = [];
    }

    draw(color) {
        // minimap
        canvas.drawRect(
            game.miniMapOffsetX + this.x / game.miniMapRatio,
            game.screenHeight + game.miniMapOffsetY + this.y / game.miniMapRatio,
            1 / 20,
            1 / 20,
            color
        );

        // map
        canvas.drawCircle(
            this.x - game.offsetX,
            this.y - game.offsetY,
            this.width,
            color
        );

        if (this.selected) {
            canvas.drawRectEmpty(
                this.x - game.offsetX,
                this.y - game.offsetY,
                this.width,
                this.height,
                game.selectColor,
                4
            );
        }
    }

    unselect() {
        this.selected = false;
    }

    select() {
        this.selected = true;
    }

    loop() {
        // planned path? move!
        if (this.actualPath.length) {
            // TODO can move?
            if (true) {
                this.x = this.actualPath[0][0];
                this.y = this.actualPath[0][1];
                this.actualPath.shift();    
            }
        }

        // select unit
        if (this.x == game.clickX && this.y == game.clickY) {
            this.select();
        }

        // move? find path
        if (this.selected && game.clickYRight >= 0 && game.clickXRight >= 0 && game.clickYRight < game.screenHeight + game.offsetY) {
            let path = game.pathFinder.findPath(
                this.x,
                this.y,
                game.clickXRight,
                game.clickYRight,
                player.storage.units,
            );
            
            if (path.length) {
                this.actualPath = path;
            } 
        }
    }
}
