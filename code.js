(() => {
    let canvas = document.getElementById("game");
    let game = canvas.getContext("2d");
    let lastTimestamp = 0;

    const FRAME_RATE = 60;
    const FRAME_DURATION = 1000 / FRAME_RATE;

    let fallers = [];
    let pokeBalls = 10;
    let points = 290;
    let score = document.getElementById("score");
    let bulbasaurPic = document.getElementById("bulbasaur");
    let charizardPic = document.getElementById("charizard");
    let squirtlePic = document.getElementById("squirtle");
    let pikachuPic = document.getElementById("pikachu");
    let jigglypuffPic = document.getElementById("jigglypuff");
    let primeapePic = document.getElementById("primeape");
    let mewtwoPic = document.getElementById("mewtwo");
    let pichuPic = document.getElementById("pichu");
    let togepiPic = document.getElementById("togepi");
    let bellossomPic = document.getElementById("bellossom");
    let blazikenPic = document.getElementById("blaziken");
    let gardevoirPic = document.getElementById("gardevoir");
    let lucarioPic = document.getElementById("lucario");
    let greninjaPic = document.getElementById("greninja");
    
    let startButton = document.getElementById("start-button");
    let stopButton = document.getElementById("stop-button");
    let pokeMart = document.getElementById("pokeMart");
   
    let buyOneBall = document.getElementById("buyOneBall");
    let buyFiveBalls = document.getElementById("buyFiveBalls");
    let oneBallCost = document.getElementById("oneBallCost");
    let fiveBallsCost = document.getElementById("fiveBallsCost");
    
    let test = document.getElementById("test");
    let won = document.getElementById("won");
    let rand;
    
    let pokedex = [
        {
            name: "bulbasaur",
            image: bulbasaurPic,
            worth: 1,
            type: "grass"
            
        },
        {
            name: "charizard",
            image: charizardPic,
            worth: 20,
            type: "fire"
        },
        {
            name: "squirtle",
            image: squirtlePic,
            worth: 1,
            type: "water"
        },
        {
            name: "pikachu",
            image: pikachuPic,
            worth: 10,
            type: "electric"
        },
        {
            name: "jigglypuff",
            image: jigglypuffPic,
            worth: 10,
            type: "fairy"
        },
        {
            name: "primeape",
            image: primeapePic,
            worth: 10,
            type: "fighting"
        },
        {
            name: "mewtwo",
            image: mewtwoPic,
            worth: 50,
            type: "psychic"
        },
        {
            name: "pichu",
            image: pichuPic,
            worth: 1,
            type: "electric"
        },
        {
            name: "togepi",
            image: togepiPic,
            worth: 1,
            type: "fairy"
        },
        {
            name: "bellossom",
            image: bellossomPic,
            worth: 10,
            type: "grass"
        },
        {
            name: "blaziken",
            image: blazikenPic,
            worth: 20,
            type: "fire"
        },
        {
            name: "gardevoir",
            image: gardevoirPic,
            worth: 20,
            type: "psychic"
        },
        {
            name: "lucario",
            image: lucarioPic,
            worth: 10,
            type: "fighting"
        },
        { 
            name: "greninja",
            image: greninjaPic,
            worth: 20,
            type: "water"
        }
    ];
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
        
        this.species = pokedex[rand];
    };
    
    Faller.prototype.draw = function () {
        game.drawImage(this.species.image, this.x, this.y, 75, 75);
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
    let pokeball = document.getElementById("pokeball");
    


    Player.prototype.draw = function () {
        game.drawImage(pokeball, this.x, this.y - 50, 75, 75);
    };

    let player = new Player(canvas.width / 2);
    let grass = document.getElementById("grass");
    let isCollide = false;
    let isCombo = 1;
    
    let pokeBox = [];
    let a;
    let b;
    
    let fallerReturn = function(sit) {
        fallers = fallers.filter((faller) => {
            return faller.y < sit;
        });
    };





    // !!!!! You can treat this function like Khan Academy’s `draw`---just precede all
    //       drawing instructions with `game.`
   
    let draw = (millisecondsElapsed) => {
        game.drawImage(grass, 0, 0, canvas.width, canvas.height);
     
        fallers.forEach((faller) => {
            faller.draw();
            faller.move(millisecondsElapsed);
        });

        player.draw();
        
        if (isCollide === true) {
            fallerReturn(439);
        } else {
            fallerReturn(canvas.height);
        }
        
        if (pokeBalls < 0 || points < 0) {
            lost.className = "";
            canvas.className = "hidden";
            oneBallCost.className = "hidden";
            fiveBallsCost.className = "hidden";
            startButton.className = "hidden";
            stopButton.className = "hidden";
            score.className = "hidden";
            pokeMart.className = "hidden";
            stopFallerGenerator();
            running = false;
        }
        
        if (points >= 1000) {
            won.className = "";
            canvas.className = "hidden";
            oneBallCost.className = "hidden";
            fiveBallsCost.className = "hidden";
            startButton.className = "hidden";
            stopButton.className = "hidden";
            score.className = "hidden";
            pokeMart.className = "hidden";
            stopFallerGenerator();
            running = false;
            
        }
    };

    // !!!!! This section is modifiable to a degree. It is responsible for generating falling objects at random.
    //       You don't want to completely eliminate this code, but you may want to revise it to modify the rate/range
    //       of objects that get generated.

    const MIN_HEIGHT = 10;
    const HEIGHT_RANGE = 20;
    let MILLISECONDS_BETWEEN_FALLERS = 750;

    let fallerGenerator;
    let exposition = document.getElementById("exposition");
    let lost = document.getElementById("lost");
            
    let comboTest = function() {
        if (pokeBox[0] === pokeBox [1]) {
            test.innerHTML = "Same Type Combo!";
            isCombo = 2;
        } else {
            test.innerHTML = "";
            isCombo = 1;
        }
        
    // let isWon = false;
    
    };
    let startFallerGenerator = () => {
        exposition.className = "hidden";
        canvas.className = "";
        pokeBox[0] = "MissingNo";

        fallerGenerator = setInterval(() => {
            rand = Math.floor(Math.random() * 14);
            fallers.push(new Faller(
                Math.floor(Math.random() * (canvas.width - 10)), 0,
                10, Math.floor(Math.random() * HEIGHT_RANGE) + MIN_HEIGHT
            ));
            
            if (((Math.floor(fallers[0].x) < Math.floor(player.x + 30)) &&
               (Math.floor(fallers[0].x) > Math.floor(player.x - 30))) && 
               ((Math.floor(fallers[0].y) >= 439)) &&  
               ((Math.floor(fallers[0].y) <= canvas.height))){
                a = fallers[0].species.type;
                pokeBox.unshift(a);
                comboTest();
                points = points + (fallers[0].species.worth * isCombo);
                pokeBalls--;
                score.innerHTML = "PokeDollars: " + points + " PokeBalls:" + pokeBalls;
                isCollide = true;
         }

            if (((Math.floor(fallers[1].x) < Math.floor(player.x + 30)) && 
                 (Math.floor(fallers[1].x) > Math.floor(player.x - 30))) && 
                 ((Math.floor(fallers[1].y) >= 439)) && 
                 ((Math.floor(fallers[1].y) <= canvas.height))){
                 b = fallers[1].species.type;
                 pokeBox.unshift(b);
                 comboTest();
                 points = points + (fallers[1].species.worth * isCombo);
                 pokeBalls--;
                 score.innerHTML = "PokeDollars: " + points + " PokeBalls:" + pokeBalls;
                 isCollide = true;
              
            } else {
                isCollide = false;
                comboTest();
                score.innerHTML = "PokeDollars: " + points + " PokeBalls:" + pokeBalls;
            
             } 

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
    
  //  let test = document.getElementById("test");

    startButton.addEventListener("click", () => {
        running = true;
        lastTimestamp = 0;
        startFallerGenerator();
        window.requestAnimationFrame(nextFrame);
      });
    
    buyOneBall.addEventListener("click", function() {
        points = points - 30;
        pokeBalls++;
        score.innerHTML = "PokeDollars: " + points + " PokeBalls:" + pokeBalls;
      });
    
    buyFiveBalls.addEventListener("click", function() {
        points = points - 145;
        pokeBalls = pokeBalls + 5;
        score.innerHTML = "PokeDollars: " + points + " PokeBalls:" + pokeBalls;
      });

    stopButton.addEventListener("click", () => {
        stopFallerGenerator();
        running = false;
        score.innerHTML = "PokeDollars: " + points + " PokeBalls:" + pokeBalls;
    });
})();
