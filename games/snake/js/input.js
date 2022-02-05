let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

import { startGame, move } from "./game.js"
import { settingsOpen } from "./settings.js";

window.addEventListener("keydown", (e) => {
    if (move == false) return;
    if (settingsOpen == true) return;
    switch (e.key) {
        case "ArrowUp":
            e.preventDefault();
            if (lastInputDirection.y != 0) break;
            inputDirection = { x: 0, y: -1 };
            startGame();
            break;
        case "ArrowDown":
            e.preventDefault();
            if (lastInputDirection.y != 0) break;
            inputDirection = { x: 0, y: 1 };
            startGame();
            break;
        case "ArrowLeft":
            e.preventDefault();
            if (lastInputDirection.x != 0) break;
            inputDirection = { x: -1, y: 0 };
            startGame();
            break;
        case "ArrowRight":
            e.preventDefault();
            if (lastInputDirection.x != 0) break;
            inputDirection = { x: 1, y: 0 };
            startGame();
            break;
        case "w":
            if (lastInputDirection.y != 0) break;
            inputDirection = { x: 0, y: -1 };
            startGame();
            break;
        case "s":
            if (lastInputDirection.y != 0) break;
            inputDirection = { x: 0, y: 1 };
            startGame();
            break;
        case "a":
            if (lastInputDirection.x != 0) break;
            inputDirection = { x: -1, y: 0 };
            startGame();
            break;
        case "d":
            if (lastInputDirection.x != 0) break;
            inputDirection = { x: 1, y: 0 };
            startGame();
            break;
    }
})

export function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection;
}

export function resetInput(){
    inputDirection = { x: 0, y: 0 };
    lastInputDirection = { x: 0, y: 0 };
}