export var SCORE = 0;
export var HIGH_SCORE = 0;

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

export function checkHighScore(){
    if (SCORE > HIGH_SCORE){
        HIGH_SCORE = SCORE;
    }
}

export function resetScore(){
    SCORE = 0;
    checkHighScore();
    printScore();
}