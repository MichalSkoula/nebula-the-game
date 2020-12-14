import { PathFinder } from './PathFinder.js';
import * as tools from './tools.js';

export class Unit {
    constructor(x = 2, y = 2, health = 100) {
        this.health = health;
        this.x = x
        this.y = y;
        this.width = 1;
        this.height = 1;

        this.pathFinder = new PathFinder();
        this.actualPath = [];
    }

    draw(color) {
        canvas.drawRect(
            this.x - game.offsetX, 
            this.y - game.offsetY, 
            this.width, 
            this.height, 
            color
        );
    }

    loop() {
        // planned path? move!
        if (this.actualPath.length) {
            this.x = this.actualPath[0][0];
            this.y = this.actualPath[0][1];
            this.actualPath.shift();
        }

        // just test
        if (this.x == game.clickX && this.y == game.clickY) {
            console.log("shot");
        } 

        // move? find path
        if (game.clickY >= 0 && game.clickX >= 0 && game.clickY < game.screenHeight + game.offsetY) {
            let path = this.pathFinder.findPath(
                this.x,
                this.y,
                game.clickX,
                game.clickY,
                game.map
            );
            
            if (path.length) {
                this.actualPath = path;
            } 
        }
    }
}
