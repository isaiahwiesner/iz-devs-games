import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, resetSnakeBody, changeSnakeSpeed } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { resetInput } from "./input.js";
import { resetScore, SCORE, HIGH_SCORE, checkHighScore } from "./score.js";

const easy = document.getElementById('easy');
const normal = document.getElementById('normal');
const hard = document.getElementById('hard');

let lastRenderTime = 0;
let gameOver = false;
let gamestart = false;
const gameBoard = document.getElementById('game');
draw();

export const eatSound = new sound("./snd/eat.wav");

export function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

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

export function changeDiff(speed){
    if (gamestart == false){
        changeSnakeSpeed(speed);
        easy.innerHTML = "<button id='easybtn'>Easy<br>(1)</button>";
        normal.innerHTML = "<button id='normalbtn'>Normal<br>(2)</button>";
        hard.innerHTML = "<button id='hardbtn'>Hard<br>(3)</button>";
        if (speed == 5){
            easy.innerHTML = "<button id='easybtn' class='active'>Easy<br>(1)</button>";
        }
        if (speed == 10){
            normal.innerHTML = "<button id='normalbtn' class='active'>Normal<br>(2)</button>";
        }
        if (speed == 15){
            hard.innerHTML = "<button id='hardbtn' class='active'>Hard<br>(3)</button>";
        }
    }
}

export function startGame(){
    gamestart = true;
}

changeDiff(10);

window.requestAnimationFrame(main);