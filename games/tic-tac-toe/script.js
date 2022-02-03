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
let placeAllowed;
const markSound = new sound("./snd/mark.wav");

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
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

function startGame(){
    oTurn = false;
    placeAllowed = true;
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
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    if (placeAllowed == false) {
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
        return;
    }
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
    placeAllowed = false;
    setTimeout(function() {
        placeAllowed = true;
    }, 1000);
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

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
    markSound.play();
}

function swapTurns(){
    oTurn = !oTurn;
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