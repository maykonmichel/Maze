function Maze(width, height, w) {
    this.cols = Math.floor(width / w);
    this.rows = Math.floor(height / w);
    this.w = w;
    this.rooms = [];
    this.route = [];

    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.cols; col++) {
            var room = new Room(col, row, w);
            this.rooms.push(room);
        }
    }

    this.current = this.rooms[0];

    this.show = function () {
        for (var k = 0; k < this.rooms.length; k++) {
            this.rooms[k].show();
        }
    };

    this.generate = function () {
        this.current.visited = true;
        this.current.hightlight();

        var exit = this.current.getRandomExit();
        if (exit) {
            exit.visited = true;
            this.route.push(exit);
            this.current = exit;
        } else {
            this.current = this.route.pop();
        }

        if (!this.current) {
            this.rooms[this.rooms.length - 1].doors[1] = false;
        }
    };

    this.index = function (col, row) {
        if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) {
            return -1;
        }
        return col + row * this.cols;
    };

    this.getRoom = function (col, row) {
        return this.rooms[this.index(col, row)];
    };
}