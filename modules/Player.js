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
        this.storage.units.push(new Unit(5, 5));
    }

    unselectAllUnits() {
        this.storage.units.forEach(unit => {
            unit.unselect();
        });
    }

    save() {
        localStorage.setItem('player', JSON.stringify(this.storage));
        console.log("game saved");
    }

    load() {
        if (typeof localStorage.getItem('player') !== null) {
            this.storage = {
                ...this.storage,
                ...JSON.parse(localStorage.getItem('player'))
            }

            // recreate units as proper objects with methods
            this.storage.units.forEach((unit, index) => {
                this.storage.units[index] = new Unit(unit.x, unit.y, unit.health);
            });

            console.log("game loaded");
            return true;
        }
        return false;
    }
}
