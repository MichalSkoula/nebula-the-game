export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function collision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

export function clickInsideMenuButton(clickX, clickY, rect) {
    return (
        clickX >= rect.x && clickX <= rect.x + rect.width &&
        clickY >= rect.y + game.screenHeight && clickY <= rect.y + rect.height + game.screenHeight
    );
}
