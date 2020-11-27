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
    }

    click() {
        //console.log(game.clickX, game.clickY);
        game.clickX = -1;
        game.clickY = -1;
    }

    registerControls() {
        // mouse click coords
        this.canvasEl.addEventListener('click', function(e) {
            game.clickX = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile) + game.offsetX;
            game.clickY = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile) + game.offsetY;
        }, false);

        // map scroll - keys
        document.addEventListener('keydown', function(e) {
            if (e.key == 'ArrowUp' && game.offsetY > 0) {
                game.offsetY -= 1;
            } else if (e.key == 'ArrowRight' && game.offsetX < game.screenWidth) {
                game.offsetX += 1;
            } else if (e.key == 'ArrowDown' && game.offsetY < game.screenHeight) {
               game.offsetY += 1;
            } else if (e.key == 'ArrowLeft' && game.offsetX > 0) {
               game.offsetX -= 1;
            }
        }, false);

        // map scroll - mouse
        function trackMouse(e) {
            game.hoverX = Math.floor(((e.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile);
            game.hoverY = Math.floor(((e.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile);

            //console.log('hover', game.hoverX, game.hoverY);
        }
        this.canvasEl.addEventListener('mousemove', trackMouse, false);
        this.canvasEl.addEventListener('mouseenter', trackMouse, false);
        this.canvasEl.addEventListener('mouseleave', trackMouse, false);
    }
}

