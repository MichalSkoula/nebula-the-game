import * as tools from './tools.js';

export class Building {
    constructor(type, x = -10, y = -10, health = 100) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 2;
        this.selected = false;
        this.health = health;
        this.type = type;
        this.buildProcess = 0;
        this.freePlace = false;
        this.units = [];
    }

    draw(color, alpha = false) {
        canvas.drawRect(
            this.x - game.offsetX,
            this.y - game.offsetY,
            this.width,
            this.height,
            color,
            alpha ? (this.freePlace ? 0.66 : 0.33) : 1
        );

        if (this.selected) {
            canvas.drawRectEmpty(
                this.x - game.offsetX,
                this.y - game.offsetY,
                this.width,
                this.height,
                game.selectColor,
                4
            );
        }
    }

    unselect() {
        this.selected = false;
    }

    select() {
        this.selected = true;
    }

    loop() {
        // select building and maybe unselect all units because buildings have bigger priority
        if (tools.clickInside(game.clickX, game.clickY, this))  {
            this.select();
            player.unselectAllUnits();
        }

        // selection tool?  select building and maybe unselect all units because buildings have bigger priority
        if (tools.collision(this, game.selection)) {
            this.select();
            player.unselectAllUnits();
        }
    }
}
