import { Unit } from './Unit.js';

export class Game {
    constructor(selectedMap) {
        this.tile = 32; // in px
        this.fps = 20;
        this.clickX = -1;
        this.clickY = -1;
        this.clickXRight = -1;
        this.clickYRight = -1;
        this.hoverX = -1;
        this.hoverY = -1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.screenWidth = 60;
        this.screenHeight = 27;
        this.menuHeight = 7;
        this.fontColor = 'black';
        this.fontColorInvert = 'white';
        this.selectColor = '#00B200';
        this.map = selectedMap;
    }

    save() {
        localStorage.game = JSON.stringify({
            'player': player.storage
        });
        console.log("game saved");
    }

    load() {
        if (typeof localStorage.game !== 'undefined') {
            let savedGame = localStorage.game;

            // load player
            player.storage = {
                ...player.storage,
                ...JSON.parse(savedGame).player
            }

            // recreate units as proper objects with methods
            player.storage.units.forEach((unit, index) => {
                player.storage.units[index] = new Unit(unit.x, unit.y, unit.health);
            });

            console.log("game loaded");
            return true;
        }
        return false;
    }
}
