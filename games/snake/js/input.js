let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

import { startGame } from "./game.js"

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection.y != 0) break;
            inputDirection = { x: 0, y: -1 };
            startGame();
            break;
        case "ArrowDown":
            if (lastInputDirection.y != 0) break;
            inputDirection = { x: 0, y: 1 };
            startGame();
            break;
        case "ArrowLeft":
            if (lastInputDirection.x != 0) break;
            inputDirection = { x: -1, y: 0 };
            startGame();
            break;
        case "ArrowRight":
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