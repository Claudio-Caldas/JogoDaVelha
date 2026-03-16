// Variáveis de estado
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Referências aos elementos do HTML
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('reset');

// --- FUNÇÕES DE LÓGICA  ---

function handleMove(index) {
    if (board[index] === '' && isGameActive) {
        board[index] = currentPlayer;
        updateBoard();
        checkWin();
        if (isGameActive) {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            updateStatus();
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            updateStatus(true);
            return;
        }
    }

    if (!board.includes('') && isGameActive) {
        isGameActive = false;
        updateStatus(false);
    }
}


// Cria os quadrados no HTML e coloca os eventos de clique
function initGame() {
    boardElement.innerHTML = ''; // Limpa o tabuleiro
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell'); // Para o CSS
        cellElement.addEventListener('click', () => handleMove(index));
        boardElement.appendChild(cellElement);
    });
    updateStatus();
}

// Atualiza o desenho do X ou O na tela
function updateBoard() {
    const cells = document.querySelectorAll('#board div');
    cells.forEach((cell, index) => {
        cell.innerText = board[index];
    });
}

// Atualiza o texto de quem joga ou quem venceu
function updateStatus(isWin) {
    if (isWin) {
        statusElement.innerText = `Jogador ${currentPlayer} Venceu!`;
    } else if (isWin === false) {
        statusElement.innerText = "Empate!";
    } else {
        statusElement.innerText = `Vez do jogador: ${currentPlayer}`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    updateBoard();
    updateStatus();
}

// Eventos iniciais
resetBtn.addEventListener('click', resetGame);
initGame(); // Inicia o jogo ao carregar o arquivo