let board = ["", "", "", "", "", "", "", "", ""];

let human = "X";
let computer = "O";

let boxes = document.querySelectorAll(".cell");
let message = document.getElementById("status");

for(let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", playGame);
}

function playGame() {
    let pos = this.dataset.index;

    if(board[pos] != "") {
        return;
    }

    board[pos] = human;
    drawBoard();

    if(checkWinner(board) || boardFull()) {
        endGame();
        return;
    }

    let bestMove = minimax(board, computer);
    board[bestMove.index] = computer;

    drawBoard();

    if(checkWinner(board) || boardFull()) {
        endGame();
    }
}

function drawBoard() {
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = board[i];
    }
}

function boardFull() {
    for(let i = 0; i < board.length; i++) {
        if(board[i] == "") {
            return false;
        }
    }
    return true;
}

function checkWinner(arr) {

    let winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i < winPatterns.length; i++) {

        let a = winPatterns[i][0];
        let b = winPatterns[i][1];
        let c = winPatterns[i][2];

        if(arr[a] != "" &&
           arr[a] == arr[b] &&
           arr[b] == arr[c]) {

            return arr[a];
        }
    }

    return null;
}

function endGame() {

    let winner = checkWinner(board);

    if(winner == human) {
        message.innerText = "You Win!";
    }
    else if(winner == computer) {
        message.innerText = "Computer Wins!";
    }
    else {
        message.innerText = "Match Draw!";
    }
}

function minimax(newBoard, player) {

    let empty = [];

    for(let i = 0; i < newBoard.length; i++) {
        if(newBoard[i] == "") {
            empty.push(i);
        }
    }

    let winner = checkWinner(newBoard);

    if(winner == human) {
        return {score: -10};
    }

    if(winner == computer) {
        return {score: 10};
    }

    if(empty.length == 0) {
        return {score: 0};
    }

    let moves = [];

    for(let i = 0; i < empty.length; i++) {

        let move = {};

        move.index = empty[i];

        newBoard[empty[i]] = player;

        if(player == computer) {
            move.score = minimax(newBoard, human).score;
        }
        else {
            move.score = minimax(newBoard, computer).score;
        }

        newBoard[empty[i]] = "";

        moves.push(move);
    }

    let bestMove;

    if(player == computer) {

        let bestScore = -1000;

        for(let i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {

        let bestScore = 1000;

        for(let i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function restartGame() {

    for(let i = 0; i < board.length; i++) {
        board[i] = "";
    }

    drawBoard();
    message.innerText = "";
}