import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, resetSnakeBody, changeSnakeSpeed } from "./snake.js";
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

var url = (window.location).href;
var check = url.split("?");
var diff = check[1].split("=");
if (diff[0] == "difficulty"){
    if (diff[1] == "1"){
        changeSnakeSpeed(5);
        const easy = document.getElementById('easy');
        easy.innerHTML = `
        <button class="active">Easy</button>
        `;
    } else if (diff[1] == "2"){
        changeSnakeSpeed(10);
        const hard = document.getElementById('normal');
        hard.innerHTML = `
        <button class="active">Normal</button>
        `;
    } else if (diff[1] == "3"){
        changeSnakeSpeed(15);
        const normal = document.getElementById('hard');
        normal.innerHTML = `
        <button class="active">Hard</button>
        `;
    } else {
        location.href = "https://play.izzdevs.me/games.snake?difficulty=2";
    }
} else {
    location.href = "https://play.izzdevs.me/games.snake?difficulty=2";
}

window.requestAnimationFrame(main);