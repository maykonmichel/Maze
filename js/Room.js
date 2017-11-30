function Room(col, row, w) {
    this.w = w;
    this.row = row;
    this.col = col;
    this.x = this.col*w;
    this.y = this.row*w;
    this.doors = [true, true, true, true];
    this.visited = false;

    this.getRandomExit = function () {

        var exits = [];
        var doors = [];
        var cr = [[0, 1, 0, -1], [-1, 0, 1, 0]];

        for(var k=0; k<4; k++) {
            var exit = maze.getRoom(col+cr[0][k], row+cr[1][k]);
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
        stroke(50);

        var xy = [[0, w, w, 0], [0, 0, w, w]];
        for(var k=0; k<4; k++) {
            if(this.doors[k]/* && this.visited*/) {
                line(this.x + xy[0][k], this.y + xy[1][k], this.x + xy[0][(k + 1) % 4], this.y + xy[1][(k + 1) % 4]);
            }
        }

        if (this.visited) {
            noStroke();
            fill(0, 0, 0, 50);
            rect(this.x, this.y, w, w);
        }
    };

    this.hightlight = function () {
        noStroke();
        fill(0, 0, 255, 100);
        rect(this.x, this.y, w, w);
    };
}