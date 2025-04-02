let solutions = [];
let currentSolutionIndex = 0;
let showQueens = true;

function solveNQueens() {
    let n = parseInt(document.getElementById("nInput").value);

    if (n < 4 || n > 8) {
        alert("Please enter a number between 4 and 8.");
        return;
    }

    solutions = [];
    let board = Array.from({ length: n }, () => Array(n).fill('.'));

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') return false;
            if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') return false;
        }
        return true;
    }

    function placeQueens(row) {
        if (row === n) {
            solutions.push(board.map(row => [...row]));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                placeQueens(row + 1);
                board[row][col] = '.';
            }
        }
    }

    placeQueens(0);

    if (solutions.length === 0) {
        alert("No solution found.");
    } else {
        currentSolutionIndex = 0;
        displayBoard(solutions[currentSolutionIndex]);
    }
}

function displayBoard(solution) {
    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    let n = solution.length;
    boardDiv.style.gridTemplateColumns = `repeat(${n}, 60px)`;
    boardDiv.style.gridTemplateRows = `repeat(${n}, 60px)`;

    solution.forEach((row, rIndex) => {
        row.forEach((cell, cIndex) => {
            let cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");

            if ((rIndex + cIndex) % 2 === 0) {
                cellDiv.classList.add("white-square");
            } else {
                cellDiv.classList.add("black-square");
            }

            if (cell === 'Q' && showQueens) {
                cellDiv.classList.add("queen");
                cellDiv.innerText = "♛";
            }

            boardDiv.appendChild(cellDiv);
        });
    });
}

function nextSolution() {
    if (solutions.length === 0) {
        alert("No solutions available. Solve first!");
        return;
    }
    currentSolutionIndex = (currentSolutionIndex + 1) % solutions.length;
    displayBoard(solutions[currentSolutionIndex]);
}

function clearBoard() {
    document.getElementById("board").innerHTML = "";
    solutions = [];
    currentSolutionIndex = 0;
}

function increaseN() {
    let nInput = document.getElementById("nInput");
    let value = parseInt(nInput.value);
    if (value < 8) {
        nInput.value = value + 1;
    }
}

function decreaseN() {
    let nInput = document.getElementById("nInput");
    let value = parseInt(nInput.value);
    if (value > 4) {
        nInput.value = value - 1;
    }
}

function toggleTheme() {
    document.body.classList.toggle("bg-gray-900");
    document.body.classList.toggle("bg-white");
    document.body.classList.toggle("text-black");
}

function toggleQueens() {
    showQueens = !showQueens;
    displayBoard(solutions[currentSolutionIndex]);
}
