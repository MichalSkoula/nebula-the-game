export class Player {
    constructor() {
        this.storage = {
            score: 0,
            x: 2,
            y: 2,
            width: 1,
            height: 1,
            color: "blue",
        };

        this.storage = {
            ...this.storage,
            ...this.load()
        }
    }

    draw() {
        game.canvas.drawRect(
            this.storage.x, 
            this.storage.y, 
            this.storage.width, 
            this.storage.height, 
            this.storage.color
        );
    }

    click() {
        if (this.storage.x == game.clickX && this.storage.y == game.clickY) {
           alert("shot"); 
        }

        this.storage.x = game.clickX;
        this.storage.y = game.clickY;
        this.save();
    }

    save() {
        localStorage.setItem('player', JSON.stringify(this.storage));
    }

    load() {
        if (typeof localStorage.getItem('player') !== null) {
            return JSON.parse(localStorage.getItem('player'));
        }
        return {};
    }
}
