import { PathFinder } from './PathFinder.js';

export class Player {
    constructor() {
        this.storage = {
            score: 0,
            x: 2,
            y: 2,
            width: 1,
            height: 1,
            color: 'red',
        };

        this.pathFinder = new PathFinder();
        this.actualPath = [];
    }

    draw() {
        canvas.drawRect(
            this.storage.x - game.offsetX, 
            this.storage.y - game.offsetY, 
            this.storage.width, 
            this.storage.height, 
            this.storage.color
        );
    }

    loop() {
        // planned path? move!
        if (this.actualPath.length) {
            this.storage.x = this.actualPath[0][0];
            this.storage.y = this.actualPath[0][1];
            this.actualPath.shift();
        }
    }

    click() {
        if (this.storage.x == game.clickX && this.storage.y == game.clickY) {
            console.log("shot");
        } 

        // move? find path
        if (game.clickY >= 0 && game.clickX >= 0 && game.clickY < game.screenHeight + game.offsetY) {
            let path = this.pathFinder.findPath(
                this.storage.x,
                this.storage.y,
                game.clickX,
                game.clickY,
                game.map
            );
            
            if (path.length) {
                this.actualPath = path;
            } 
        }
    }

    save() {
        localStorage.setItem('player', JSON.stringify(this.storage));
        console.log("game saved");
    }

    load() {
        if (typeof localStorage.getItem('player') !== null) {
            this.storage = {
                ...this.storage,
                ...JSON.parse(localStorage.getItem('player'))
            }
            console.log("game loaded");
            return true;
        }
        return false;
    }
}
