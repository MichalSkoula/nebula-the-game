export class Canvas {
    constructor() {
        this.canvasEl = document.getElementById('canvas');
        this.ctx = this.canvasEl.getContext('2d');

        this.clickX = false;
        this.clickY = false;

        this.keepAspectRatio();
        this.registerClicks();
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
                switch (game.map.matrix[row][col]) {
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

    registerClicks() {
        this.canvasEl.addEventListener('click', function(event) {
            game.clickX = Math.floor(((event.clientX - game.canvas.canvasEl.offsetLeft) * (game.canvas.canvasEl.width / game.canvas.canvasEl.offsetWidth)) / game.tile);
            game.clickY = Math.floor(((event.clientY - game.canvas.canvasEl.offsetTop) * (game.canvas.canvasEl.height / game.canvas.canvasEl.offsetHeight)) / game.tile);
        }, false);
    }

    keepAspectRatio() {
        function resizeCanvas(canvas) {
            let nav = document.getElementById('nav');
            let header = document.getElementById('header');

            if (document.documentElement.clientWidth / document.documentElement.clientHeight < 1.78) {
                canvas.style.width = nav.style.width = header.style.width = '100vw';
                // sum to 56vw
                canvas.style.height = '44vw';
                nav.style.height = '10vw';
                header.style.height = '2vw';
            } else {
                canvas.style.width = nav.style.width = header.style.width = '178vh';
                // sum to 100vh
                canvas.style.height = '79vh';
                nav.style.height = '18vw';
                header.style.height = '3.5vw';
            }
        }

        window.onresize = function(event) {
            resizeCanvas(this.canvasEl);
        };

        resizeCanvas(this.canvasEl);
    }
}

