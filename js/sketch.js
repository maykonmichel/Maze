var maze;
var start;

function setup() {
    createCanvas(1301, 601);

    maze = new Maze(width, height, 10);
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
            maze.move(0);
            break;
        case 'D':
            maze.move(1);
            break;
        case 'S':
            maze.move(2);
            break;
        case 'A':
            maze.move(3);
            break;
    }
}