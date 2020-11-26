export const name = 'canvas';

let ctx;
let canvas = document.getElementById('canvas');

export function init() {
    ctx = canvas.getContext('2d');
}

export function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
