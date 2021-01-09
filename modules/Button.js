export class Button {
    constructor(bgColor, color, text, id, x, y, width = 5, height = 1.5, active = true) {
        this.bgColor = bgColor;
        this.color = color;
        this.text = text;
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = active;
    }

    draw() {
        canvas.drawRect(
            this.x,
            this.y + game.screenHeight,
            this.width,
            this.height,
            this.bgColor
        );

        canvas.drawText(
            this.x,
            this.y + game.screenHeight + this.height,
            this.text,
            this.color,
            this.height
        )
    }

    performClick() {
        switch (this.id) {
            case 'save':
                game.save();
                break;
            case 'load':
                game.load();
                break;
            case 'unit':
                player.addUnit();
                break;
            default:
                break;
        }
    }
}
