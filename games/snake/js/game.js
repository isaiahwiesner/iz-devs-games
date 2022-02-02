import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, resetSnakeBody } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { resetInput } from "./input.js"
import { resetScore, SCORE, HIGH_SCORE, checkHighScore } from "./score.js"

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game');
draw();

function main(currentTime){
    if (gameOver) {
        var rickroll = randomInt(1, 5);
        if (rickroll == 1){
            window.open("https://youtu.be/dQw4w9WgXcQ");
        }
        if (SCORE > HIGH_SCORE){
            alert(`You died!\nScore: ${SCORE}\nNew high score!`);
        } else{
            alert(`You died!\nScore: ${SCORE}`);
        }
        gameOver = false;
        lastRenderTime = 0;
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

window.requestAnimationFrame(main);

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