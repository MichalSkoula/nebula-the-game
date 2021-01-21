import * as tools from './tools.js';

export class Unit {
    constructor(x = 2, y = 2, health = 100) {
        this.health = health;
        this.x = x
        this.y = y;
        this.width = 1;
        this.height = 1;
        this.selected = false;
        this.moveWait = 0;
        this.moveDesireX = -1;;
        this.moveDesireY = -1;;

        this.actualPath = [];
    }

    draw(color) {
        // minimap
        canvas.drawRect(
            game.miniMapOffsetX + this.x * game.minimapTile,
            game.screenHeight + this.y * game.minimapTile,
            1 / 15, // a little bigger
            1 / 15, // a little bigger
            color
        );

        // not on menu
        if (this.y - game.offsetY >= game.screenHeight) {
            return; 
        }

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
            if (this.x == this.actualPath[0][0] && this.y == this.actualPath[0][1]) {
                this.actualPath.shift();
            }

            if (game.pathFinder.freeWayUnits(this.actualPath[0][0], this.actualPath[0][1], player.storage.units)) {
                this.x = this.actualPath[0][0];
                this.y = this.actualPath[0][1];
                this.actualPath.shift();
            } else {
                console.log("blocked");
                
            }
        } else if (this.moveDesireX != this.x && this.moveDesireX != this.y && this.moveDesireX != -1) {
            this.moveWait++;

            if (this.moveWait > game.fps) {
                this.findPath(this.moveDesireX, this.moveDesireY);
                this.moveWait = 0;
            }
        }

        // select unit
        if (this.x == game.clickX && this.y == game.clickY) {
            this.select();
        }

        // selection tool? 
        if (tools.clickInside(this.x, this.y, game.selection)) {
            this.select();
        }

        // move? find path
        if (this.selected && game.clickYRight >= 0 && game.clickXRight >= 0 && game.clickYRight < game.screenHeight + game.offsetY) {
            this.findPath(game.clickXRight, game.clickYRight);
        }
    }

    findPath(x, y) {
        let path = game.pathFinder.findPath(
            this.x,
            this.y,
            x,
            y,
            player.storage.units,
        );
        
        if (path.length) {
            this.actualPath = path;
        } else {
            this.moveDesireX = x;
            this.moveDesireY = y;
        }
    }
}
