var cols;
var rows;
var w = 50;
var maze = [];
var route = [];
var current;

function setup() {
    createCanvas(1301, 601);
    cols = Math.floor(width/w);
    rows = Math.floor(height/w);

    for(var row=0; row<rows; row++) {
        for(var col=0; col<cols; col++) {
            var room = new Room(col, row);
            maze.push(room);
        }
    }

    current = maze[0];
}

function draw() {
    background(255);

    for(var k=0; k<maze.length; k++) {
        maze[k].show();
    }

    current.visited = true;
    current.hightlight();

    var exit = current.getRandomExit();
    if(exit) {
        exit.visited = true;
        route.push(exit);
        current = exit;
    } else {
        current = route.pop();
    }

    if(!current) {
        maze[maze.length-1].doors[1] = false;
    }
}

function index(col, row) {
    if(col<0 || col>=cols || row<0 || row>=cols) {
        return -1;
    }
    return col + row * cols;
}

function Room(col, row) {
    this.row = row;
    this.col = col;
    this.doors = [true, true, true, true];
    this.visited = false;

    this.getRandomExit = function () {
        var exits = [];
        var doors = [];
        var cr = [[0, 1, 0, -1], [-1, 0, 1, 0]];

        for(var k=0; k<4; k++) {
            var exit = maze[index(col+cr[0][k], row+cr[1][k])];
            if(exit && !exit.visited) {
                exits.push(exit);
                doors.push(k);
            }
        }
        if(exits.length) {
            var i = Math.floor(Math.random() * exits.length);
            this.doors[doors[i]] = false;
            exits[i].doors[(doors[i]+2)%4] = false;
            return exits[i];
        } else {
            return undefined;
        }
    };

    this.show = function() {
        var x = this.col*w;
        var y = this.row*w;

        stroke(50);

        var xy = [[0, w, w, 0], [0, 0, w, w]];
        for(var k=0; k<4; k++) {
            if(this.doors[k]) {
                line(x + xy[0][k], y + xy[1][k], x + xy[0][(k + 1) % 4], y + xy[1][(k + 1) % 4]);
            }
        }

        if (this.visited) {
            noStroke();
            fill(0, 0, 0, 50);
            rect(x, y, w, w);
        }
    };

    this.hightlight = function () {
        var x = this.col*w;
        var y = this.row*w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w);
    };
}