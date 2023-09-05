
export function isWin(reels:string[][]) {
    // Check rows
    for (let row = 0; row < 3; row++) {
        if (reels[0][row] === reels[1][row] && reels[1][row] === reels[2][row]) {
            return true;
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (reels[col][0] === reels[col][1] && reels[col][1] === reels[col][2]) {
            return true;
        }
    }

    // Check diagonals
    if (reels[0][0] === reels[1][1] && reels[1][1] === reels[2][2]) {
        return true;
    }
    if (reels[0][2] === reels[1][1] && reels[1][1] === reels[2][0]) {
        return true;
    }

    // No win found
    return false;
}
