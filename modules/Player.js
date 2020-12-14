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
        this.storage.units.forEach(unit => {
            unit.loop();
        });
    }

    draw() {
        this.storage.units.forEach(unit => {
            console.log(typeof unit);
            unit.draw(this.storage.color);
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
