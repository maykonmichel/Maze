var maze;
var start;

function setup() {
    createCanvas(1301, 601);

    maze = new Maze(width, height, 50);
    start = false;
}

function draw() {
    background(255);
    maze.show();

    if (!start && !maze.generate()) {
        return;
    }

    start = true;
}

function keyPressed() {
    if (!start) {
        return;
    }

    switch (this.key) {
        case 'W':
        case '&':
            maze.move(0);
            break;
        case 'D':
        case '\'':
            maze.move(1);
            break;
        case 'S':
        case '(':
            maze.move(2);
            break;
        case 'A':
        case ']':
            maze.move(3);
            break;
    }
}