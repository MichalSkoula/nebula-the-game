import { Unit } from './Unit.js';

export class Player {
    constructor() {
        this.storage = {
            score: 0,
            color: 'red',
            units: [],
            buildings: [],
            resources: {
                'gold': 200
            }
        };
    }

    loop() {
        // click on map?
        if (game.clickY >= 0 && game.clickX >= 0 && game.clickY < game.screenHeight + game.offsetY) {
            this.unselectAllUnits();
        }

        let selectionCount = 0;
        this.storage.units.forEach(unit => {
            unit.loop();

            // max XX selected
            if (unit.selected) {
                selectionCount++;
                if (selectionCount > game.selectionWidth) {
                    unit.selected = false;
                }
            }
        });
    }

    draw() {
        this.storage.units.forEach(unit => {
            unit.draw(this.storage.color);
        });

        let selectionIndex = 0;
        this.storage.units.forEach(unit => {
            if (unit.selected) {
                unit.drawSelection(this.storage.color, selectionIndex);
                selectionIndex++;
            }
        });
    }

    addUnit() {
        let x = 15;
        let y = 15;

        let testArray = [
            // first round
            [x, y],
            [x, y - 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
            [x, y + 1],
            [x - 1, y + 1],
            [x - 1, y],
            [x - 1, y -1],

            // second round
            [x, y - 2],
            [x + 1, y - 2],
            [x + 2, y - 2],
            [x + 2, y - 1],
            [x + 2, y],
            [x + 2, y + 1],
            [x + 2, y + 2],
            [x + 1, y + 2],
            [x, y + 2],
            [x - 1, y + 2],
            [x - 2, y + 2],
            [x - 2, y + 1],
            [x - 2, y],
            [x - 2, y - 1],
            [x - 2, y - 2],
            [x - 1, y - 2],
        ];

        for (let i = 0; i < testArray.length; i++) {
            if (game.pathFinder.freeWay(testArray[i][0], testArray[i][1], this.storage.units)) {
                this.storage.units.push(new Unit(testArray[i][0], testArray[i][1]));
                console.log('Unit added');
                return true;
            }
        }

        console.log('Unit adding failed, no space!')
        return false;
    }

    addBuilding() {
        console.log('Building added');
    }

    unselectAllUnits() {
        this.storage.units.forEach(unit => {
            unit.unselect();
        });
    }

    keyDelete() {
        for (let i = 0; i < this.storage.units.length; i++) {
            if (this.storage.units[i].selected) {
                this.deleteUnit(i);
                break;
            }
        }

        for (let i = 0; i < this.storage.buildings.length; i++) {
            if (this.storage.buildings[i].selected) {
                this.deleteBuilding(i);
                break;
            }
        }
    }

    deleteUnit(deleteIndex) {
        this.storage.units.splice(deleteIndex, 1);
    }

    deleteBuilding(deleteIndex) {
        this.storage.buildings.splice(deleteIndex, 1);
    }
}
