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

    findPath(startX, startY, endX, endY, map) {
        // transpose it ... for whatever reason because of this library
        let grid = this.transpose(map.matrix);

        // create 1D array from 2D array
        grid = this.convert2Dto1D(grid);

        // Create a maze as an ndarray
        let maze = window.ndarray(grid, [map.size, map.size]);

        // Create path planner
        let planner = window.createPlanner(maze);

        // Find path
        let path = [];
        let dist = planner.search(startX, startY, endX, endY, path);

        console.log(path);
        
        return this.convert1Dto2D(path, 2);
    }
}
