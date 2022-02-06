import { settingsOpen } from "./settings.js"
import { checkSettings } from "../../js/localStorage.js";
checkSettings(false);
import { checkHighscores } from "../../js/highScores.js";
checkHighscores(false);

const block = document.getElementById('block');
const hole = document.getElementById('hole');
const character = document.getElementById('character');
const game = document.getElementById('game');
let gameTimer = 0;
let lastScore = 0;
let score = 0;
let jumping = 0;
export let started = false;
let gameover = false;

let highScores = JSON.parse(localStorage.getItem("highScores"));
let highscore = highScores[0].flappybat;
document.getElementById('highscore').innerHTML = 'High score: '+highscore;

export const rickrollSound = new sound("./snd/rickroll.wav");
const flapSound = new sound("./snd/flap.wav");
const pointSound = new sound("./snd/point.wav");
const hitSound = new sound("./snd/hit.wav");

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

function startGame() {
    if (settingsOpen == true) return;
    block.classList.add('animating');
    hole.classList.add('animating');
    started = true;
    gameover = false;
}
function stopGame(){
    block.classList.remove('animating');
    hole.classList.remove('animating');
    document.getElementById("gameoverMessage").classList.add("show");
    if (score > highscore){
        highscore = score;
        highScores[0].flappybat = score;
        localStorage.setItem('highScores', JSON.stringify(highScores));
        document.querySelector("[data-gameover-message-text]").innerText = "You died!\nScore: "+score+"\nNew high score!";
    } else {
        document.querySelector("[data-gameover-message-text]").innerText = "You died!\nScore: "+score;
    }
    rickrollSound.play();
    started = false;
    gameover = true;
    gameTimer = 0;
    lastScore = 0;
    score = 0;
    jumping = 0;
    document.getElementById('score').innerHTML = score;
    document.getElementById('highscore').innerHTML = 'High score: '+highscore;
}
document.getElementById('restartButton').addEventListener('click', () => {
    document.getElementById("gameoverMessage").classList.remove("show");
    rickrollSound.stop();
    gameover = false;
    character.style.top = (-190 + -190)+'px';
});

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random() * 150) + 200);
    hole.style.top = random + 'px';
});

setInterval(function () {
    gameTimer++;
    if (started == false) return;
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    if (jumping == 0) {
        character.style.top = (characterTop + 3) + 'px';
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue('top'));
    if ((characterTop > -190)||((blockLeft < 70)&&(blockLeft > 0)&&((characterTop+40 > holeTop)||(characterTop < holeTop-150)))){
        stopGame();
        hitSound.play()
    } else if ((blockLeft < 20)&&(blockLeft > 0)&&((!characterTop+20 > holeTop)||(!characterTop < holeTop-150))&&(gameTimer-lastScore > 150)){
        score++;
        lastScore = gameTimer;
        document.getElementById('score').innerHTML = score;
        pointSound.play()
    }
}, 10);


document.addEventListener('keydown', (e) => {
    if (e.keyCode == 32) {
        if (gameover == true) return;
        if (started == false) return startGame(), jump();
        jump();
    }
});

game.addEventListener('click', () => {
    if (gameover == true) return;
    if (started == false) return startGame(), jump();
    jump();
});

function jump() {
    if (settingsOpen == true) return;
    if (jumping == 0) {
        jumping = 1;
        var jumpCount = 0;
        flapSound.play();
        var jumpInterval = setInterval(function () {
            jumpCount++;
            var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
            if ((characterTop > -548) && (jumpCount < 15)) {
                character.style.top = (characterTop - 5) + 'px';
            }
            if (jumpCount == 20) {
                clearInterval(jumpInterval);
                jumping = 0;
                jumpCount = 0;
            }
        }, 10);
    }
}