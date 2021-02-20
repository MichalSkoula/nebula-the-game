export class Message {
    constructor(text, color = 'black', ttl = 100) {
        this.text = text;
        this.color = color;
        this.ttl = ttl;
    }

    loop() {
        this.ttl--;
    }

    draw(y) {
        canvas.drawText(
            1,
            y + 1,
            this.text,
            this.color,
            0.75
        )
    }
}
