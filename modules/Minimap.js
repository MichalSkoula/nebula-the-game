export class Minimap {
    constructor(active = true) {
        this.active = active;
        this.x = game.miniMapOffsetX;
        this.y = game.screenHeight;
        this.width = this.height = game.map.size * game.minimapTile;
    }

    draw() {
        if (!this.active) {
            return;
        }

        // draw whole background at once
        canvas.drawRect(
            this.x,
            this.y,
            this.width,
            this.height,
            game.map.colors.grass
        );

        // draw viewport rectangle 
        canvas.drawRectEmpty(
            this.x + game.offsetX * game.minimapTile,
            this.y + game.offsetY * game.minimapTile,
            game.screenWidth * game.minimapTile,
            this.y * game.minimapTile,
            game.fontColor,
            1
        );

        for (let row = 0; row < game.map.size; row++) {
            for (let col = 0; col < game.map.size; col++) {
                let x = this.x + col * game.minimapTile;
                let y = this.y + row * game.minimapTile;
                
                switch (game.map.matrix[row][col]) {
                    case 1:
                        canvas.drawRect(x, y, game.minimapTile, game.minimapTile, game.map.colors.wall);
                        break;
                    case 3:
                        canvas.drawRect(x, y, game.minimapTile, game.minimapTile, game.map.colors.water);
                        break;
                    default: break;
                }
            }
        }
    }

    moveViewport() {
        let offsetX = Math.floor((game.clickXViewportPrecise - this.x) * (game.map.size / (game.map.size * game.minimapTile)) - game.screenWidth / 2);
        let offsetY = Math.floor((game.clickYViewportPrecise - this.y) * (game.map.size / (game.map.size * game.minimapTile)) - game.screenHeight / 2);
        game.offsetX = offsetX;
        game.offsetY = offsetY;
    }
}
