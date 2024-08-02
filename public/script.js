const socket = io();

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        if (board[index] === '') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            socket.emit('move', { index, player: currentPlayer });
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            checkWin();
        }
    });
});

socket.on('move', (data) => {
    board[data.index] = data.player;
    cells[data.index].textContent = data.player;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    checkWin();
});

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(`${board[a]} wins!`);
            resetGame();
            break;
        }
    }

    if (!board.includes('')) {
        alert('It\'s a draw!');
        resetGame();
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}