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
        this.ctx.fillRect(x, y, width, height);
    }

    click() {
        console.log(game.clickX, game.clickY);
        game.clickX = -1;
        game.clickY = -1;
    }

    registerClicks() {
        this.canvasEl.addEventListener('click', function(event) {
            game.clickX = Math.round(((event.clientX - canvas.canvasEl.offsetLeft) * (canvas.canvasEl.width / canvas.canvasEl.offsetWidth)) / game.tile) - 1;
            game.clickY = Math.round(((event.clientY - canvas.canvasEl.offsetTop) * (canvas.canvasEl.height / canvas.canvasEl.offsetHeight)) / game.tile) - 1;
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

