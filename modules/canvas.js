export const name = 'canvas';

let ctx;

export function init() {
    let canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}

export function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
