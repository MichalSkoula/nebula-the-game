export class Player {
    constructor() {
        this.score = 0;
        this.x = 2;
        this.y = 2;
        this.width = 2;
        this.height = 2;
        this.color = "blue";
    }

    draw() {
        canvas.drawRect(
            this.x * game.tile, 
            this.y * game.tile, 
            this.width * game.tile, 
            this.height * game.tile, 
            this.color
        );
    }

    click() {
        if (this.x == game.clickX && this.y == game.clickY) {
            console.log("shot");
        }
    }
}
