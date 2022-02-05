import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, resetSnakeBody } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { resetInput } from "./input.js";
import { resetScore, SCORE, HIGH_SCORE, checkHighScore } from "./score.js";
export let move = true;

let lastRenderTime = 0;
let gameOver = false;
export let gamestart = false;
const gameBoard = document.getElementById('game');
draw();

export const eatSound = new sound("./snd/eat.wav");
const gameoverSound = new sound("./snd/gameover.wav");
export const rickrollSound = new sound("./snd/rickroll.wav");

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        let settings = JSON.parse(localStorage.getItem("settings"));
        if (settings[0].sound == true) this.sound.currentTime = 0;
        if (settings[0].sound == true) this.sound.play();
    }
    this.stop = function(){
        let settings = JSON.parse(localStorage.getItem("settings"));
        if (settings[0].sound == true) this.sound.pause();
    }
}

function main(currentTime){
    if (gameOver) {
        rickrollSound.play();
        gameoverSound.play();
        document.getElementById('gameoverMessage').classList.add("show");
        if (SCORE > HIGH_SCORE){
            document.querySelector("[data-gameover-message-text]").innerText = `You died!\nScore: ${SCORE}\nNew high score!\n`
        } else{
            document.querySelector("[data-gameover-message-text]").innerText = `You died!\nScore: ${SCORE}\n`
        }
        gameOver = false;
        lastRenderTime = 0;
        gamestart = false;
        move = false;
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

document.getElementById('restartButton').addEventListener("click", () => {
    document.getElementById('gameoverMessage').classList.remove("show");
    move = true;
    rickrollSound.stop();
});

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

export function startGame(){
    gamestart = true;
}

window.requestAnimationFrame(main);