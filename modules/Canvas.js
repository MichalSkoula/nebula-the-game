export class Canvas {
    constructor() {
        this.canvasEl = document.getElementById('canvas');
        this.ctx = this.canvasEl.getContext('2d');

        this.clickX = false;
        this.clickY = false;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * game.tile, y * game.tile, width * game.tile, height * game.tile);
    }

    drawText(x, y, text, color, size) {
        this.ctx.font = size * game.tile + "px Arial";
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x * game.tile, y * game.tile);
    }

    drawLine(x, y, x2, y2, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x * game.tile, y * game.tile);
        this.ctx.lineTo(x2 * game.tile, y2 * game.tile);
        this.ctx.stroke();
    }

    drawMap() {
        for (let row = 0; row < game.screenHeight; row++) {
            for (let col = 0; col < game.screenWidth; col++) {
                switch (game.map.matrix[row + game.offsetY][col + game.offsetX]) {
                    case 0:
                        this.drawRect(col, row, 1, 1, game.map.colors.grass);
                        break;
                    case 1:
                        this.drawRect(col, row, 1, 1, game.map.colors.wall);
                        break;
                    default: break;
                }
            }
        }

        // grid
        for (let i = 0; i < game.screenWidth; i++) {
            this.drawLine(i, 0, i, game.screenHeight, game.map.colors.grid);
        }
        for (let i = 0; i < game.screenHeight; i++) {
            this.drawLine(0, i, game.screenWidth, i, game.map.colors.grid);
        }
    }

    loop() {
        //console.log(game.clickX, game.clickY);
        game.clickX = -1;
        game.clickY = -1;
    }
}