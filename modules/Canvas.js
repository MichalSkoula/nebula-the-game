export class Canvas {
    constructor() {
        this.canvasEl = document.getElementById('canvas');
        this.ctx = this.canvasEl.getContext('2d');
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    }

    drawRect(x, y, width, height, color, alpha = 1) {
        this.ctx.fillStyle = color;
        if (alpha != 1) {
            this.ctx.globalAlpha = alpha;
        }
        this.ctx.fillRect(x * game.tile, y * game.tile, width * game.tile, height * game.tile);
        if (alpha != 1) {
            this.ctx.globalAlpha = 1;
        }
    }

    drawRectEmpty(x, y, width, height, color, lineWidth = 1) {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.rect(
            x * game.tile - lineWidth / 2,
            y * game.tile - lineWidth / 2,
            width * game.tile + lineWidth,
            height * game.tile + lineWidth,
        );
        this.ctx.stroke();
    }

    drawCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(
            x * game.tile + game.tile / 2,
            y * game.tile + game.tile / 2,
            radius * game.tile / 2,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
    }

    drawCircleEmpty(x, y, radius, color, lineWidth = 1) {
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.arc(
            x * game.tile + game.tile / 2,
            y * game.tile + game.tile / 2,
            radius * game.tile / 2,
            0,
            2 * Math.PI
        );
        this.ctx.stroke();
    }

    drawText(x, y, text, color, size = 1) {
        this.ctx.font = size * game.tile + "px Arial";
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x * game.tile, y * game.tile);
    }

    drawLine(x, y, x2, y2, color, lineWidth = 1) {
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x * game.tile, y * game.tile);
        this.ctx.lineTo(x2 * game.tile, y2 * game.tile);
        this.ctx.stroke();
    }
}
