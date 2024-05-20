//board

const fps = 30;

let board;
let boardWidth = 420;
let boardHeight = 720;
let context;

//bird
let birdWidth = 100;
let birdHeight = 33;
let birdX = boardWidth/8
let birdY = boardHeight/2  
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight 
}

//tower
let pipeArray = [];
let pipeWidth = 100;
let pipeHeight = 550;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //moving left
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

//music

var audio = new Audio('Audio/Osama.mp3');
audio.play();
audio.currentTime = 30;

//loop

audio.addEventListener('ended', function() {
    this.currentTime = 30; 
    this.play();
}, false);

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext("2d");

    //create the flight
    // context.fillStyle = "green"
    // context.fillRect(bird.x, bird.y, bird.width, bird.height); ---hitbox---

    birdImg = new Image(); 
    birdImg.src = "./imgs/plane.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }
 
    topPipeImg = new Image();
    topPipeImg.src= "./imgs/pipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./imgs/pipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes, 2250)
    document.addEventListener("keydown", moveBird);
}


//updates frames (game loop)
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return
    }
    context.clearRect(0, 0, board.width, board.height)

    //bird
    velocityY += gravity
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //doesnt break reality
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if (bird.y > board.height) {
        gameOver = true
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }
        
        if(detectCollision(bird, pipe)) {
            gameOver = true;
            audio.pause();
            birdImg.src ="./imgs/explosion.png";
            bird.width *= 2;
            bird.height *= 5;
            bird.y -= 60;
            var audio2 = new Audio('./Audio/Allahu Akbar (Used as Meme Sound) - Sound Effect for Editing.mp3');
            audio2.play();
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    //score
    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("MISSION SUCCESS", 5, 90);
    }
}


function placePipes() {
    if (gameOver) {
        return;
    }

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe)

    let bottomPipe = {
        img : bottomPipeImg,   
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        //jump height
        velocityY = -7.5
  
        //restart
        if (gameOver) {
            bird.y = birdY
            pipeArray = [];
            score = 0;
            gameOver = false;
            audio.play();
            audio.currentTime = 30; 
            birdImg.src = "./imgs/plane.png";
            bird.width = 100;
            bird.height = 33;
        }
    }
}

//collision

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

