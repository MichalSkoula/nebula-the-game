import { Unit } from './Unit.js';
import { Building } from './Building.js';
import { PathFinder } from './PathFinder.js';

export class Game {
    constructor(selectedMap) {
        this.tile = 32; // in px
        this.fps = 20;
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
        this.miniMapOffsetX = 53.24;

        this.pathFinder = new PathFinder();

        this.selectionOffsetX = 26;
        this.selectionOffsetY = 28;
        this.selectionWidth = 16;
        this.selectionHeight = 4;
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

            // recreate units and buildings as proper objects with methods
            player.storage.units.forEach((unit, index) => {
                player.storage.units[index] = new Unit(unit.x, unit.y, unit.health);
            });
            player.storage.buildings.forEach((building, index) => {
                player.storage.buildings[index] = new Building(building.type, building.x, building.y, building.health);
            });

            console.log("game loaded");
            return true;
        }
        return false;
    }

    draw() {
        // map
        for (let row = 0; row < game.screenHeight; row++) {
            for (let col = 0; col < game.screenWidth; col++) {
                // terra nullis?
                if (row + game.offsetY < 0 || row + game.offsetY >= game.map.size || col + game.offsetX < 0 || col + game.offsetX >= game.map.size) {
                    canvas.drawRect(col, row, 1, 1, game.map.colors.nothing);
                } else {
                    switch (game.map.matrix[row + game.offsetY][col + game.offsetX]) {
                        case 0:
                        case 2:
                            canvas.drawRect(col, row, 1, 1, game.map.colors.grass);
                            break;
                        case 1:
                            canvas.drawRect(col, row, 1, 1, game.map.colors.wall);
                            break;
                        case 3:
                            canvas.drawRect(col, row, 1, 1, game.map.colors.water);
                            break;
                        default: break;
                    }    
                }
                
            }
        }

        // grid
        for (let i = 0; i < game.screenWidth; i++) {
            canvas.drawLine(i, 0, i, game.screenHeight, game.map.colors.grid, 0.4);
        }
        for (let i = 0; i < game.screenHeight; i++) {
            canvas.drawLine(0, i, game.screenWidth, i, game.map.colors.grid, 0.4);
        }
    }
}
