/*
   Don't worry, this is still JavaScript---the latest version known as ES6.
   We've been looking at ES5 this semester because our tools, particularly
   Khan Academy, are not ES6-savvy yet. The good news is that ES5 code works
   fine in ES6; the deeper differences don't affect what we're doing at this
   stage. A summary of the most visible differences:

   - Instead of `var`, use `let`
   - Instead of `function (...)`, use `(...) =>`
   - There is a special `const` definition now for variables whose values you
     don’t intend to change.

   For a full summary of differences, try out this page:

       http://es6-features.org

   There are many other resources available as well.
*/
(() => {
    // In general, don't touch anything except for sections explicitly marked as such.
    // Look for the exclamations points (!!!!!) for such markers.
    let canvas = document.getElementById("game");
    let game = canvas.getContext("2d");
    let lastTimestamp = 0;

    const FRAME_RATE = 60;
    const FRAME_DURATION = 1000 / FRAME_RATE;

    // !!!!! Change/add to this as needed. What other objects or variables will you need for your game idea?
    //       A score? Different kinds of fallers? Player statistics? It's all up to you!
    let fallers = [];

    // Check out that cool ES6 feature: default parameter values!
    const DEFAULT_DESCENT = 0.0001; // This is per millisecond.
    let Faller = function (x, y, width, height, dx = 0, dy = 0, ax = 0, ay = DEFAULT_DESCENT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // Velocity.
        this.dx = dx;
        this.dy = dy;

        // Acceleration.
        this.ax = ax;
        this.ay = ay;
    };

    Faller.prototype.draw = function () {
        game.fillStyle = "red";
        game.fillRect(this.x, this.y, this.width, this.height);
    };

    Faller.prototype.move = function (millisecondsElapsed) {
        // Good old Newtonian physics.
        this.x += this.dx * millisecondsElapsed;
        this.y += this.dy * millisecondsElapsed;

        this.dx += this.ax * millisecondsElapsed;
        this.dy += this.ay * millisecondsElapsed;
    };

    const DEFAULT_PLAYER_WIDTH = 45;
    const DEFAULT_PLAYER_HEIGHT = 15;
    const DEFAULT_PLAYER_Y = canvas.height - DEFAULT_PLAYER_HEIGHT;
    let Player = function (x, y = DEFAULT_PLAYER_Y, width = DEFAULT_PLAYER_WIDTH, height = DEFAULT_PLAYER_HEIGHT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    Player.prototype.draw = function () {
        game.fillStyle = "darkgreen";
        game.beginPath();
        game.moveTo(this.x - this.width / 2, this.y + this.height);
        game.lineTo(this.x, this.y);
        game.lineTo(this.x + this.width / 2, this.y + this.height);
        game.closePath();
        game.fill();
    };

    let player = new Player(canvas.width / 2);

    // !!!!! You can treat this function like Khan Academy’s `draw`---just precede all
    //       drawing instructions with `game.`
    let draw = (millisecondsElapsed) => {
        game.clearRect(0, 0, canvas.width, canvas.height);

        fallers.forEach((faller) => {
            faller.draw();
            faller.move(millisecondsElapsed);
        });

        player.draw();

        // Remove fallers that have hit the ground. You might have other reasons to remove fallers.
        fallers = fallers.filter((faller) => {
            return faller.y < canvas.height;
        });
    };

    // !!!!! This section is modifiable to a degree. It is responsible for generating falling objects at random.
    //       You don't want to completely eliminate this code, but you may want to revise it to modify the rate/range
    //       of objects that get generated.
    const MIN_WIDTH = 10;
    const WIDTH_RANGE = 20;
    const MIN_HEIGHT = 10;
    const HEIGHT_RANGE = 20;
    const MILLISECONDS_BETWEEN_FALLERS = 750;

    let fallerGenerator;
    let startFallerGenerator = () => {
        fallerGenerator = setInterval(() => {
            // !!!!! This code looks really repetitive! Hmmmm, what to do...
            let fallerWidth = Math.floor(Math.random() * WIDTH_RANGE) + MIN_WIDTH;
            fallers.push(new Faller(
                Math.floor(Math.random() * (canvas.width - fallerWidth)), 0,
                fallerWidth, Math.floor(Math.random() * HEIGHT_RANGE) + MIN_HEIGHT
            ));
        }, MILLISECONDS_BETWEEN_FALLERS);
    };

    let stopFallerGenerator = () => clearInterval(fallerGenerator);

    // !!!!! This section is also modifiable to a degree: it is responsible for moving the "player" around based on
    //       mouse movement.
    let setPlayerPositionBasedOnMouse = (event) => {
        player.x = event.clientX / document.body.clientWidth * canvas.width;
    };

    document.body.addEventListener("mouseenter", setPlayerPositionBasedOnMouse);
    document.body.addEventListener("mousemove", setPlayerPositionBasedOnMouse);

    // OK, back to the no-touch zone (unless you _really_ know what you’re doing).
    let running = false;
    let nextFrame = (timestamp) => {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
        }

        if (timestamp - lastTimestamp < FRAME_DURATION) {
            if (running) {
                window.requestAnimationFrame(nextFrame);
            }

            return;
        }

        draw(timestamp - lastTimestamp);

        lastTimestamp = timestamp;
        if (running) {
            window.requestAnimationFrame(nextFrame);
        }
    };

    document.getElementById("start-button").addEventListener("click", () => {
        running = true;
        lastTimestamp = 0;
        startFallerGenerator();
        window.requestAnimationFrame(nextFrame);
    });

    document.getElementById("stop-button").addEventListener("click", () => {
        stopFallerGenerator();
        running = false;
    });
})();
