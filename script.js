const cells = document.querySelectorAll('.cell');
const playerIndicator = document.getElementById('player-indicator');
const restartBtn = document.getElementById('restart-btn');
const modalOverlay = document.getElementById('result-modal');
const resultMessage = document.getElementById('result-message');
const newGameBtn = document.getElementById('new-game-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-cell-index'));

    if (board[index] !== '' || !gameActive) return;

    updateCell(cell, index);
    checkWin();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerIndicator.textContent = `Player ${currentPlayer}'s Turn`;
    playerIndicator.className = `turn-${currentPlayer.toLowerCase()}`;
}

function checkWin() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningLine = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        endGame(false);
        return;
    }

    const roundDraw = !board.includes('');
    if (roundDraw) {
        endGame(true);
        return;
    }

    switchPlayer();
}

function endGame(draw) {
    gameActive = false;
    
    if (draw) {
        resultMessage.textContent = "It's a Draw!";
        resultMessage.className = 'draw';
    } else {
        resultMessage.textContent = `Player ${currentPlayer} Wins!`;
        resultMessage.className = `win-${currentPlayer.toLowerCase()}`;
    }
    
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 300);
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    playerIndicator.textContent = `Player X's Turn`;
    playerIndicator.className = 'turn-x';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell'; // Reset to just 'cell'
    });
    
    modalOverlay.classList.remove('active');
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
newGameBtn.addEventListener('click', restartGame);

// Initial state
playerIndicator.className = 'turn-x';
