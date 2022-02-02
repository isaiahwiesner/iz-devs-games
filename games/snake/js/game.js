import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, resetSnakeBody, changeSnakeSpeed } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { resetInput } from "./input.js"
import { resetScore, SCORE, HIGH_SCORE, checkHighScore } from "./score.js"

let lastRenderTime = 0;
let gameOver = false;
let gamestart = false;
const gameBoard = document.getElementById('game');
draw();

function main(currentTime){
    if (gameOver) {
        if (SNAKE_SPEED == 15){
            var rickroll = randomInt(1, 5);
            if (rickroll == 1){
                window.open("https://youtu.be/dQw4w9WgXcQ");
            }
        }
        if (SCORE > HIGH_SCORE){
            alert(`You died!\nScore: ${SCORE}\nNew high score!`);
        } else{
            alert(`You died!\nScore: ${SCORE}`);
        }
        gameOver = false;
        lastRenderTime = 0;
        gamestart = false;
        resetInput();
        resetSnakeBody();
        checkHighScore();
        resetScore();
    }
    
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

function update(){
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function changeDiff(speed){
    if (gamestart == true) return;
    const easy = document.getElementById('easy');
    const normal = document.getElementById('normal');
    const hard = document.getElementById('hard');
    changeSnakeSpeed(speed);
    easy.innerHTML = "<button onclick='changeDiff(5)'>Easy</button>";
    normal.innerHTML = "<button onclick='changeDiff(10)'>Normal</button>";
    hard.innerHTML = "<button onclick='changeDiff(15)'>Hard</button>";
    if (speed = 5){
        easy.innerHTML = "<button onclick='changeDiff(5)' class='active'>Easy</button>";
    }
    if (speed = 10){
        normal.innerHTML = "<button onclick='changeDiff(10)'>Normal</button>";
    }
    if (speed = 15){
        hard.innerHTML = "<button onclick='changeDiff(15)'>Hard</button>";
    }
}

export function startGame(){
    gamestart = true;
}

changeDiff(10);

window.requestAnimationFrame(main);