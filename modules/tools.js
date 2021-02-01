export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function randomInArray(items) {
    return items[Math.floor(Math.random() * items.length)];
}

export function collision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

export function clickInside(clickX, clickY, rect) {
    if (rect.x === false || rect.y === false || rect.width === false || rect.height === false) {
        return false;
    }
    
    return (
        clickX >= rect.x 
        && clickX <= rect.x + rect.width 
        && (clickY) >= rect.y
        && (clickY) <= rect.y + rect.height
    );
}

export function clickInsideExclusive(clickX, clickY, rect) {
    if (rect.x === false || rect.y === false || rect.width === false || rect.height === false) {
        return false;
    }
    
    return (
        clickX >= rect.x 
        && clickX < rect.x + rect.width 
        && (clickY) >= rect.y
        && (clickY) < rect.y + rect.height
    );
}

/*
export function clickInsideCoordinates(clickX, clickY, x, y, width, height) {
    return (
        clickX >= x 
        && clickX <= x + width 
        && (clickY) >= y 
        && (clickY) <= y + height
    );
}
*/
