$(document).ready(function () {
    // Initialize the current player to 'X'
    let currentPlayer = 'X';
    
    // Initialize the game board as an array of 9 empty strings
    let board = ['', '', '', '', '', '', '', '', ''];
    
    // Initialize a flag to indicate if the game is active
    let gameActive = true;

    // Define the winning conditions for the game (8 possible combinations)
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Function to check if there is a winner
    function checkWinner() {
        // Iterate through each winning condition
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            // Check if the current board state matches the winning condition
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                // Return the winner and the indices of the winning combination
                return { winner: board[a], indices: [a, b, c] };
            }
        }
        // If no winner is found, check if the game is a tie (no more empty cells)
        return board.includes('') ? null : { winner: 'Tie', indices: [] };
    }

    // Function to update the game status
    function updateStatus() {
        let result = checkWinner();
        if (result) {
            // If there is a winner or a tie, update the status text
            if (result.winner === 'Tie') {
                $('#statusText').text("It's a tie!");
            } else {
                $('#statusText').text(`${result.winner} wins!`);
                // Add a winning class to the winning combination
                result.indices.forEach(index => {
                    $(`[data-index=${index}] span`).addClass('winning');
                });
            }
            // Set the game to inactive
            gameActive = false;
        } else {
            // If the game is still active, update the status text to show whose turn it is
            $('#statusText').text(`Player ${currentPlayer}'s turn`);
        }
    }

    // Event listener for cell clicks
    $('.cell').click(function () {
        const index = $(this).data('index');
        
        // Check if the cell is already occupied or the game is not active
        if (board[index] !== '' || !gameActive) {
            return;
        }
        
        // Update the board with the current player's mark
        board[index] = currentPlayer;
        $(this).html(`<span>${currentPlayer}</span>`);

        // Switch the current player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // Update the game status
        updateStatus();
    });

    // Event listener for the reset button
    $('#resetButton').click(function () {
        // Reset the game state
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        $('.cell').html('').removeClass('winning'); // Reset the winning class
        $('#statusText').text(`Player X's turn`);
    });
});