var maze;

function setup() {
    createCanvas(1301, 601);

    maze = new Maze(width, height, 50);
}

function draw() {
    background(255);

    maze.show();

    maze.generate();
}

function keyPressed() {
    if(this.key === '') {

    }
}