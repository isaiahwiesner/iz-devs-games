let highScores = JSON.parse(localStorage.getItem("highScores"));
export var SCORE = 0;
export let HIGH_SCORE = highScores[0].snake;

const score = document.getElementById('score');
const highscore = document.getElementById('highscore');

export function addScore(){
    SCORE += 1;
    printScore()
}

function printScore(){
    score.innerHTML = SCORE;
    highscore.innerHTML = "High score: " + HIGH_SCORE;
}

printScore()

export function checkHighScore(){
    if (SCORE > HIGH_SCORE){
        highScores[0].snake = SCORE;
        localStorage.setItem("highScores", JSON.stringify(highScores));
        HIGH_SCORE = SCORE;
    }
}

export function resetScore(){
    SCORE = 0;
    checkHighScore();
    printScore();
}