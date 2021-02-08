export class Button {
    constructor(bgColor, color, text, id, x, y, width = 5, height = 1.5, active = true) {
        this.bgColor = bgColor;
        this.color = color;
        this.text = text;
        this.id = id;
        this.x = x;
        this.y = y + game.screenHeight;
        this.width = width;
        this.height = height;
        this.active = active;
    }

    draw() {
        if (!this.active) {
            return;
        }

        canvas.drawRect(
            this.x,
            this.y,
            this.width,
            this.height,
            this.bgColor
        );

        canvas.drawText(
            this.x,
            this.y + this.height,
            this.text,
            this.color,
            this.height
        )
    }

    performClick() {
        if (!this.active) {
            return;
        }

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
            case 'building':
                player.build('town');
                break;
            default:
                break;
        }
    }
}
