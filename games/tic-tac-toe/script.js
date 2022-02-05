import { checkSettings } from "../../js/localStorage.js";
checkSettings(false);

const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll("[data-cell]");
const game = document.getElementById('game');
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const score = document.getElementById('score');
var xScore = 0;
var oScore = 0;
let oTurn;
const markSound = new sound("./snd/mark.wav");
let o_AI = true;

export function switchAI(){
    o_AI = !o_AI;
}
export function checkAI(){
    return o_AI;
}

startGame();

restartButton.addEventListener("click", startGame);

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

function startGame(){
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
    score.innerHTML = `X's: ${xScore} | O's: ${oScore}`;
}

function handleClick(e){
    if (o_AI == true) {
        if (oTurn == true){
            return;
        }
    }
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw){
    if (draw) {
        winningMessageTextElement.innerText = "Draw!";
    } else if (oTurn){
        winningMessageTextElement.innerText = `O's win!`;
        oScore += 1;
    } else {
        winningMessageTextElement.innerText = `X's win!`;
        xScore += 1;
    }
    winningMessageElement.classList.add("show");
    score.innerHTML = `X's: ${xScore} | O's: ${oScore}`;
}

function isDraw(){
    return [...cellElements].every( cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

function AIplaceMark(){
    var num = -1;
    let empty = [];
    for (const cell of cellElements){
        num++;
        if (!cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) empty.push(num);
    }
    let newcell;
    let found = false;
    if (checkBest(empty)) {
        newcell = checkBest(empty);
        found = true;
    } else if (checkXBest(empty)){
        newcell = checkXBest(empty);
        found = true;
    } else if (empty.includes(4)){
        newcell = cellElements[4];
        found = true;
    } else if (cellElements[4].classList.contains(O_CLASS)) {
        var loop = [0, 2, 6, 8];
        var oppos = [{0: 8, 2: 6, 6: 2, 8: 0}];
        for (const index of loop) {
            if (empty[index]) {
                if (empty[oppos.index]) {
                    newcell = cellElements[index];
                    found = true;
                }
            }
        }
    }
    if (found == false) {
        newcell = cellElements[empty[Math.floor(Math.random()*empty.length)]];
    }
    placeMark(newcell, O_CLASS);
    if (checkWin(O_CLASS)){
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function checkXBest(obj){
    for (const index of obj){
        cellElements[index].classList.add(X_CLASS)
        if (checkWin(X_CLASS)) {
            cellElements[index].classList.remove(X_CLASS);
            return cellElements[index];
        }
        cellElements[index].classList.remove(X_CLASS);
    }
}

function checkBest(obj){
    for (const index of obj){
        cellElements[index].classList.add(O_CLASS)
        if (checkWin(O_CLASS)) {
            cellElements[index].classList.remove(O_CLASS);
            return cellElements[index];
        }
        cellElements[index].classList.remove(O_CLASS);
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
    markSound.play();
}

function swapTurns(){
    oTurn = !oTurn;
    if (o_AI == true){
        if (oTurn == true){
            setTimeout(function(){
                AIplaceMark();
            }, 1000);
        }
    }
}

function setBoardHoverClass(){
    game.classList.remove(X_CLASS);
    game.classList.remove(O_CLASS);
    if (oTurn) {
        game.classList.add(O_CLASS);
    } else {
        game.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}