// inspired by http://gregtrowbridge.com/a-basic-pathfinding-algorithm/

export class PathFinder {

    findShortestPath(startX, startY, endX, endY, map) {
        console.log("start");
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.map = map;
        this.weight = 0;

        var distanceFromTop = startY;
        var distanceFromLeft = startX;

        // Each "location" will store its coordinates
        // and the shortest path required to arrive there
        var location = {
            distanceFromTop: distanceFromTop,
            distanceFromLeft: distanceFromLeft,
            path: [],
            status: 'Start'
        };

        // Initialize the queue with the start location already inside
        var queue = [location];

        // Loop through the grid searching for the goal
        while (queue.length > 0) {
            // Take the first location off the queue
            var currentLocation = queue.shift();

            // Explore North
            var newLocation = this.exploreInDirection(currentLocation, 'North');
            if (newLocation.status === 'Goal') {
                console.log("weight", this.weight);
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore East
            var newLocation = this.exploreInDirection(currentLocation, 'East');
            if (newLocation.status === 'Goal') {
                console.log("weight", this.weight);
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore South
            var newLocation = this.exploreInDirection(currentLocation, 'South');
            if (newLocation.status === 'Goal') {
                console.log("weight", this.weight);
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore West
            var newLocation = this.exploreInDirection(currentLocation, 'West');
            if (newLocation.status === 'Goal') {
                console.log("weight", this.weight);
                return newLocation.path;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }
        }

        // No valid path found
        return false;
    };

    // This function will check a location's status
    // (a location is "valid" if it is on the grid, is not an "obstacle",
    // and has not yet been visited by our algorithm)
    // Returns "Valid", "Invalid", "Blocked", or "Goal"
    locationStatus(location) {
        var dft = location.distanceFromTop;
        var dfl = location.distanceFromLeft;
        
           console.log(this.map.matrix[dfl][dft]);
        if (dft == this.endY && dfl == this.endX) {
           
            return 'Goal';
        } else if (this.map.matrix[dfl][dft] === 1) {
             console.log(this.map.matrix[dft][dfl]);
            return 'Blocked';
        } else {
            return 'Valid';
        }
    };


    // Explores the grid from the given location in the given
    // direction
    exploreInDirection(currentLocation, direction) {
        this.weight++;
        var newPath = currentLocation.path.slice();
        newPath.push(direction);

        var dft = currentLocation.distanceFromTop;
        var dfl = currentLocation.distanceFromLeft;

        if (direction === 'North') {
            dft -= 1;
        } else if (direction === 'East') {
            dfl += 1;
        } else if (direction === 'South') {
            dft += 1;
        } else if (direction === 'West') {
            dfl -= 1;
        }

        var newLocation = {
            distanceFromTop: dft,
            distanceFromLeft: dfl,
            path: newPath,
            status: 'Unknown'
        };
        newLocation.status = this.locationStatus(newLocation);

        // If this new location is valid, mark it as 'Visited'
        if (newLocation.status === 'Valid') {
            //this.map.matrix[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 0;
        }

        return newLocation;
    };
}
