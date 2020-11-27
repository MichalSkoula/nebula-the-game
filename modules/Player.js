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

    click() {
        if (this.storage.x == game.clickX && this.storage.y == game.clickY) {
            console.log("shot");
        }

        if (game.clickY < game.screenHeight) {
            this.storage.y = game.clickY;
            this.storage.x = game.clickX;
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
