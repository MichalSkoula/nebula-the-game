import { Unit } from './Unit.js';
import { PathFinder } from './PathFinder.js';

export class Game {
    constructor(selectedMap) {
        this.tile = 32; // in px
        this.fps = 30;
        this.clickX = -1;
        this.clickY = -1;
        this.clickXViewport = -1;
        this.clickYViewport = -1;
        this.clickXViewportPrecise = -1;
        this.clickYViewportPrecise = -1;
        this.clickXRight = -1;
        this.clickYRight = -1;
        this.selection = false;
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
        this.minimapTile = 0.035;
        this.miniMapOffsetX = 26.65;
        this.pathFinder = new PathFinder();
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
