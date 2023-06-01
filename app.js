const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const restartButton = document.querySelector("#restart-button");
const scoreDisplay = document.querySelector("#score");
const startCells = [
    "", "", "", "", "", "", "", "", ""
]
let go = "circle"
let circleScore = 0;
let crossScore = 0;
infoDisplay.textContent = "Circle goes first"

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    })
}

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go + "'s go."
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    let circleWins = false;
    let crossWins = false;

    winningCombos.forEach(array => {
        circleWins = circleWins || array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        crossWins = crossWins || array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))
    })

    if (circleWins) {
        infoDisplay.textContent = "Circle Wins!";
        circleScore++;
        updateScore();
        disableBoard();
    } else if (crossWins) {
        infoDisplay.textContent = "Cross Wins!";
        crossScore++;
        updateScore();
        disableBoard();
    } else {
        const isTie = Array.from(allSquares).every(
            (square) =>
                square.firstChild !== null &&
                (square.firstChild.classList.contains("circle") ||
                    square.firstChild.classList.contains("cross"))
        );

        if (isTie) {
            infoDisplay.textContent = "It's a tie!";
            disableBoard();
        }
    }
}

function disableBoard() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => square.removeEventListener("click", addGo));
}

function restartGame() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => square.remove());
    createBoard();
    infoDisplay.textContent = "Circle goes first";
}

function updateScore() {
    scoreDisplay.textContent = `Circle: ${circleScore} - Cross: ${crossScore}`;
}

createBoard();
restartButton.addEventListener("click", restartGame);
updateScore();