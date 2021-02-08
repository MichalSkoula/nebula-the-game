export class Building {
    constructor(type, x = -10, y = -10, health = 100) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 2;
        this.selected = false;
        this.health = health;
        this.type = type;
        this.buildProcess = 0;
        this.freePlace = false;
    }

    draw(color, alpha = 1) {
        canvas.drawRect(
            this.x - game.offsetX,
            this.y - game.offsetY,
            this.width,
            this.height,
            color,
            alpha
        );
    }
}
