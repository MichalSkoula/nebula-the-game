import { Unit } from './Unit.js';

export class Player {
    constructor() {
        this.storage = {
            score: 0,
            color: 'red',
            units: []
        };
    }

    loop() {
        // click on map?
        if (game.clickY >= 0 && game.clickX >= 0 && game.clickY < game.screenHeight + game.offsetY) {
            this.unselectAllUnits();
        }

        this.storage.units.forEach(unit => {
            unit.loop();
        });
    }

    draw() {
        this.storage.units.forEach(unit => {
            unit.draw(this.storage.color);
        });
    }

    addUnit() {
        let x = 5;
        let y = 5;

        let testArray = [
            [x, y],
            [x, y - 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
            [x, y + 1],
            [x - 1, y + 1],
            [x - 1, y],
            [x - 1, y -1]
        ];

        for (let i = 0; i < 9; i++) {
            if (game.pathFinder.freeWay(testArray[i][0], testArray[i][1], this.storage.units)) {
                this.storage.units.push(new Unit(testArray[i][0], testArray[i][1]));
                console.log('Unit added');
                return true;
            }
        }

        console.log('Unit adding failed, no space!')
        return false;
    }

    unselectAllUnits() {
        this.storage.units.forEach(unit => {
            unit.unselect();
        });
    }
}
