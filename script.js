const container = document.getElementById("game-container");
const currentPlayerDisplay = document.getElementById("current-player");
let gridSize = 5;
let gameBoard = [];
let currentPlayer = 1;

function initGame() {
    container.innerHTML = "";
    gameBoard = [];

    for (let row = 0; row < gridSize; row++) {
        let boardRow = [];
        for (let col = 0; col < gridSize; col++) {
            let box = document.createElement("div");
            box.classList.add("box");
            box.style.top = `${row * 45 + 5}px`;
            box.style.left = `${col * 45 + 5}px`;
            box.dataset.row = row;
            box.dataset.col = col;
            container.appendChild(box);
            boardRow.push({ box, owner: null, edges: { top: false, right: false, bottom: false, left: false } });

            let dot = document.createElement("div");
            dot.classList.add("dot");
            dot.style.top = `${row * 45}px`;
            dot.style.left = `${col * 45}px`;
            container.appendChild(dot);

            if (col < gridSize - 1) {
                let hLine = document.createElement("div");
                hLine.classList.add("line", "horizontal");
                hLine.style.top = `${row * 45}px`;
                hLine.style.left = `${col * 45 + 5}px`;
                hLine.onclick = () => drawLine(row, col, "horizontal");
                container.appendChild(hLine);
            }

            if (row < gridSize - 1) {
                let vLine = document.createElement("div");
                vLine.classList.add("line", "vertical");
                vLine.style.top = `${row * 45 + 5}px`;
                vLine.style.left = `${col * 45}px`;
                vLine.onclick = () => drawLine(row, col, "vertical");
                container.appendChild(vLine);
            }
        }
        gameBoard.push(boardRow);
    }
}

function drawLine(row, col, type) {
    let box = gameBoard[row]?.[col];
    let nextBox = null;

    if (type === "horizontal") {
        if (box) box.edges.top = true;
        nextBox = gameBoard[row - 1]?.[col];
        if (nextBox) nextBox.edges.bottom = true;
    } else {
        if (box) box.edges.left = true;
        nextBox = gameBoard[row]?.[col - 1];
        if (nextBox) nextBox.edges.right = true;
    }

    let lineElement = event.target;
    lineElement.style.backgroundColor = "black";
    lineElement.onclick = null;

    let boxCompleted = checkForCompletedBox(row, col);
    let nextBoxCompleted = nextBox ? checkForCompletedBox(row, col - 1) : false;

    if (!boxCompleted && !nextBoxCompleted) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentPlayerDisplay.textContent = currentPlayer;
    }
}

function checkForCompletedBox(row, col) {
    let box = gameBoard[row]?.[col];
    if (box && Object.values(box.edges).every(Boolean) && !box.owner) {
        box.owner = currentPlayer;
        box.box.classList.add(`p${currentPlayer}`);
        return true;
    }
    return false;
}

function resetGame() {
    currentPlayer = 1;
    currentPlayerDisplay.textContent = currentPlayer;
    initGame();
}

initGame();
