let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const resetButton = document.getElementById('reset-btn');
const bgMusic = document.getElementById('bg-music');
const turnSound = document.getElementById('turn-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (gameBoard[cellIndex] !== '' || !gameActive) return; 

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    turnSound.play();  // Play turn sound

    if (checkWinner()) {
        winSound.play();  // Play win sound
        statusText.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        drawSound.play();  // Play draw sound
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Start background music
bgMusic.play();
