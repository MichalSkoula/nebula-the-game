export class PathFinder {

    // https://github.com/mikolalysenko/l1-path-finder

    transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }

    convert1Dto2D(array, number) {
        let newArray = [];
        while (array.length) {
            newArray.push(array.splice(0, number));
        }
        return newArray;
    }

    convert2Dto1D(matrix) {
        return [].concat(...matrix);
    }

    reduceOnlyToCollisionAble(startX, startY, matrix, units) {
        units.forEach(unit => {
            if (unit.y == startY && unit.x == startX) {
                matrix[unit.y][unit.x] = 0; // this is me :) free way
            } else {
                matrix[unit.y][unit.x] = 1; // blocked by another unit
            }
        });

        return matrix;
    }

    findPath(startX, startY, endX, endY, map, units) {
        let grid = this.reduceOnlyToCollisionAble(startX, startY, map.matrix, units);

        // transpose it ... for whatever reason because of this library
        grid = this.transpose(grid);

        // create 1D array from 2D array
        grid = this.convert2Dto1D(grid);

        // Create a maze as an ndarray
        let maze = window.ndarray(grid, [map.size, map.size]);

        // Create path planner
        let planner = window.createPlanner(maze);

        // Find path
        let path = [];
        planner.search(startX, startY, endX, endY, path);        
        path = this.convert1Dto2D(path, 2);

        // Fill in the gaps for smooth walk
        let finalPath = [];
        for (let i = 0; i < path.length; i++) {
            finalPath.push(path[i]);

            if (typeof path[i + 1] !== 'undefined') {
                if (path[i][0] > path[i + 1][0]) { // left
                    for (let y = path[i][0]; y > path[i + 1][0]; y--) {
                        finalPath.push([y, path[i][1]]);
                    }
                } else if (path[i][0] < path[i + 1][0]) { // right
                    for (let y = path[i][0]; y < path[i + 1][0]; y++) {
                        finalPath.push([y, path[i][1]]);
                    }
                } else if (path[i][1] > path[i + 1][1]) { // up
                    for (let y = path[i][1]; y > path[i + 1][1]; y--) {
                        finalPath.push([path[i][0], y]);
                    }
                } else if (path[i][1] < path[i + 1][1]) { 
                    for (let y = path[i][1]; y < path[i + 1][1]; y++) {
                        finalPath.push([path[i][0], y]);
                    }
                }
            }
        }

        //console.log(finalPath);
        return finalPath;
    }
}
