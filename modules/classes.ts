import Emojis from './emojis';

export class Grid {
    height: number;
    width: number;
    grid: Space[][]

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
        this.grid = this.createGrid();
    }

    //creates a grid in the form of an array of rows accessed with grid[x][y]
    createGrid() {
        let result = [];
        for (let x = 0; x < this.height; x++) {
            let row = [];
            for (let y = 0; y < this.width; y++) {
                row.push(new Space(x, y));
            };
            result.push(row);
        };

        return result;
    };
    //formats into a discord sendable string
    formatGrid() {
        let result = '';
        for (const column of this.grid) {
            //makes a new var where each object is its contents
            let StrCol = column.map(value => value.display);
            result += StrCol.join('') + '\n';
        }
        return result;
    }
    //randomly fills grid with asteroids
    populateAsteroids(num: number) {
        let i = 0
        while (i < num) {
            const ranX = Math.floor(Math.random() * this.width);
            const ranY = Math.floor(Math.random() * this.height);
            const target = this.grid[ranX][ranY]

            if (target.display === Emojis.emptySpace) {
                target.contents.push(new Asteroid)
                i++;
            }
        }
        return
    }
}

//stuff that can be inside of a space, display is what it will show up as in game, layer is to decide what shows up 
//0 is background and the higher the layer higher priority it has ie z axis
interface Contents {
    display: string;
    layer: number;
}

export class Space {
    contents: Contents[];
    location: Location;
    constructor(x: number, y: number) {
        this.contents = [];
        this.location = new Location(x, y)
    }
    //figures out what the top item to display and sets it to open space if missing
    //if two items have the same layer in one space i guess thats just too bad
    //if there is no contents it will set as empty space
    get display() {
        let topItem = this.contents[0]
        for (const item of this.contents) {
            if (item.layer >= topItem.layer) {
                topItem = item;
            }
        }
        if (topItem === undefined) {
            return Emojis.emptySpace;
        }
        return topItem.display;
    }
}

//basic asteroid class 
class Asteroid {
    display: string;
    layer: 0;
    constructor() {
        this.display = Emojis.asteroid;
    }
}

//placeholder player, nothing near what is planned
class Player {
    display: string;
    layer: 1;
    location: Location;
}

class Location {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}