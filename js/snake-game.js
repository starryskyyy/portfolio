const canvas = document.getElementById("snakeCanvas")
const ctx = canvas.getContext('2d');
const actualScore = document.getElementById('score');
const bestScore = document.getElementById('best-score');
bestScore.innerText = '' + 0

class SnakeBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}


const grad = ctx.createLinearGradient(0, 100, 600, 100);
grad.addColorStop(0, 'rgba(48, 160, 127, 1)');
grad.addColorStop(1, 'rgba(24, 80, 74, 1)');


let speed = 7;

let headX = 10;
let headY = 10;
const snakeLen = [];
let tailLen = 2;

let tileCount = 17;
let tileSize = canvas.width / tileCount - 2
let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

let score = 0;
let bestScoreHolder = 0;

const soundSuccess = new Audio("success-sound.mp3")

//game loop
function drawGame() {
    changeSnakePos()
    let result = isGameOver();
    if (result) {
        return;
    }
    clearScreen()

    checkCollusion()
    drawSnake()
    drawApple()
    drawScore()

    if (score > 5) {
        speed = 9;
    }
    if (score > 10) {
        speed = 11;
    }

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    //if snake will hit the wall
    if (headX < 0) {
        gameOver = true;
    } else if (headX === tileCount) {
        gameOver = true;
    } else if (headY < 0) {
        gameOver = true;
    } else if (headY === tileCount) {
        gameOver = true;
    }
    for (let i = 0; i < snakeLen.length; i++) {
        let part = snakeLen[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
    if (gameOver) {
        ctx.font = "34px Fira Code";
        ctx.fillText("game over!", canvas.width / 6.5, canvas.height / 2)
        if (bestScoreHolder <= score) {
            bestScoreHolder = score;
            bestScore.innerText = '' + score
        }

    }
    return gameOver;
}

function clearScreen() {
    ctx.fillStyle = '#011627'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

    ctx.fillStyle = "#225250";

    for (let i = 0; i < snakeLen.length; i++) {
        let part = snakeLen[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeLen.push(new SnakeBody(headX, headY)); // push item to the end of the list
    while (snakeLen.length > tailLen) {
        snakeLen.shift(); // remove furthers item from head if have more than our tail size.
    }

    ctx.fillStyle = "#43d9ad";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function drawApple() {

    //Starting Path
    ctx.beginPath();
    //setting the fill style to red
    ctx.fillStyle="#43d9ad";
    // Making a circle
    ctx.arc(appleX * tileCount + tileCount / 2,
        appleY * tileCount + tileCount / 2,
        tileCount / 2,
        0,
        2 * Math.PI);
    // Closing the Path
    ctx.stroke();
//   Filling the area enclosed by the path
    ctx.fill();

}

function checkCollusion() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLen++;
        score++;
        soundSuccess.play().then(r => "");
    }
}

function drawScore() {
    actualScore.innerText = '' + score
}

document.body.addEventListener('keydown', keyDown)

function keyDown(event) {
    // up arrow
    if (event.keyCode === 38) {
        // prevent to go opposite direction and collusion into itself
        if (yVelocity === 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    // down arrow
    if (event.keyCode === 40) {
        // prevent to go opposite direction and collusion into itself
        if (yVelocity === -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // right arrow
    if (event.keyCode === 39) {
        // prevent to go opposite direction and collusion into itself
        if (xVelocity === -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
    // left arrow
    if (event.keyCode === 37) {
        // prevent to go opposite direction and collusion into itself
        if (xVelocity === 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    if (event.keyCode === 32) {
        speed = 7;

        headX = 10;
        headY = 10;
        tailLen = 2;

        tileCount = 17;
        tileSize = canvas.width / tileCount - 2
        xVelocity = 0;
        yVelocity = 0;

        appleX = 5;
        appleY = 5;
        score = 0;
        drawGame()

    }
}

function changeSnakePos() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

drawGame()