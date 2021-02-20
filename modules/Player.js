import { Unit } from './Unit.js';
import { Building } from './Building.js';

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
        this.letsBuild = null;
    }

    loop() {
        // lets build?
        if (this.letsBuild !== null 
            && game.hoverX > -1 
            && game.hoverY > -1 
            && game.hoverY <= game.screenHeight - this.letsBuild.height + game.offsetY) {
            
            // is it free?
            if (this.letsBuild.x != game.hoverX || this.letsBuild.y != game.hoverY) {
                this.letsBuild.freePlace = true;
                outerLoop:
                for (let y = 0; y < this.letsBuild.height; y++) {
                    for (let x = 0; x < this.letsBuild.width; x++) {
                        if (!game.pathFinder.freeWay(game.hoverX + x, game.hoverY + y)) {
                            this.letsBuild.freePlace = false;
                            break outerLoop;
                        }
                    }
                }    
            }

            // set coords
            this.letsBuild.x = game.hoverX;
            this.letsBuild.y = game.hoverY;

            // build it??
            if (this.letsBuild.freePlace && game.clickX > -1 && game.clickY > -1) {
                // move selected villagers
                this.storage.units.forEach(unit => {
                    if (unit.selected && unit.type == 'villager') {
                        unit.findPath(game.clickX, game.clickY);
                    }
                });

                // ok, build it already
                this.addBuilding();
            }
        }

        // click on map? unselect, BUT only if not building
        if (game.clickY >= 0 && game.clickX >= 0 && game.clickY < game.screenHeight + game.offsetY && this.letsBuild === null) {
            this.unselectAllUnits();
            this.unselectAllBuildings();
        }

        // loop for unit
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

        // loop for building
        this.storage.buildings.forEach(building => {
            building.loop();
        });
    }

    draw() {
        // units
        this.storage.units.forEach(unit => {
            unit.draw(this.storage.color);
        });

        // selection on the menu
        let selectionIndex = 0;
        this.storage.units.forEach(unit => {
            if (unit.selected) {
                unit.drawSelection(this.storage.color, selectionIndex);
                selectionIndex++;
            }
        });

        // buildings
        this.storage.buildings.forEach(building => {
            building.draw(this.storage.color);
        });

        // lets build?
        if (this.letsBuild) {
            this.letsBuild.draw(this.color, true);
        }
    }

    addUnit(x = 15, y = 15) {
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
            if (game.pathFinder.freeWay(testArray[i][0], testArray[i][1])) {
                this.storage.units.push(new Unit(testArray[i][0], testArray[i][1]));
                game.newMessage("Unit created");
                return true;
            }
        }

        game.newMessage("Cannot create unit :( no space");
        return false;
    }

    build(buildingType) {
        this.letsBuild = new Building('town');
    }

    addBuilding() {
        if (this.letsBuild !== null) {
            this.storage.buildings.push(this.letsBuild);
            this.letsBuild = null;
            game.newMessage("Building built");
        }
    }

    unselectAllUnits() {
        this.storage.units.forEach(unit => {
            unit.unselect();
        });
    }

    unselectAllBuildings() {
        this.storage.buildings.forEach(building => {
            building.unselect();
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
        game.newMessage("Unit killed");
    }

    deleteBuilding(deleteIndex) {
        this.storage.buildings.splice(deleteIndex, 1);
        game.newMessage("Building destroyed");
    }

    isSelectedVillager(onlyOne = false) {
        let villagers = 0;
        this.storage.units.forEach(unit => {
            if (unit.selected && unit.type == 'villager') {
                villagers++;
            }
        });

        if (onlyOne && villagers !== 1) {
            return false;
        }

        return villagers > 0;
    }

    isSelectedBuilding(onlyOne = false) {
        let towns = 0;
        this.storage.buildings.forEach(building => {
            if (building.selected && building.type == 'town') { // for now
                towns++;
                return;
            }
        });

        if (onlyOne && towns !== 1) {
            return false;
        }

        return towns > 0;
    }
}
