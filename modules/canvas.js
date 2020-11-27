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

    drawMap() {
        for (let row = 0; row < 42; row++) {
            for (let col = 0; col < 96; col++) {
                switch (game.map.matrix[row + game.offsetY][col + game.offsetX]) {
                    case 1:
                        this.drawRect(col, row, 1, 1, game.map.colors.wall);
                        break;
                    default: break;
                }
            }
        }
    }

    click() {
        console.log(game.clickX, game.clickY);
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

            console.log('hover', game.hoverX, game.hoverY);
        }
        this.canvasEl.addEventListener('mousemove', trackMouse, false);
        this.canvasEl.addEventListener('mouseenter', trackMouse, false);
        this.canvasEl.addEventListener('mouseleave', trackMouse, false);
    }

    keepAspectRatio() {
        function resizeCanvas(canvas) {
            // real canvas size
            canvas.height = game.tile * game.screenHeight;
            canvas.width = game.tile * game.screenWidth;

            // style size
            let nav = document.getElementById('nav');
            canvas.style.height = '46vw';
            nav.style.height = '10vw';

            if (document.documentElement.clientWidth / document.documentElement.clientHeight < 1.78) {
                canvas.style.width = nav.style.width = '100vw';
            } else {
                canvas.style.width = nav.style.width = '178vh';
            }
        }

        window.onresize = function(e) {
            resizeCanvas(canvas.canvasEl);
        };

        resizeCanvas(canvas.canvasEl);
    }
}

