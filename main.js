/*
 ** The Gameboard represents the state of the board
 ** Each square holds a Cell and we expose a
 ** selectSquare method to be able to add Cells to squares
 */

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const inputElOne = document.getElementById("inputOne");
const inputElTwo = document.getElementById("inputTwo");
const confirmBtn = document.querySelector("#confirmBtn");
const form = document.querySelector("form");

const firstNameHeader = document.getElementById("first-name");
const secondNameHeader = document.getElementById("second-name");

favDialog.showModal();

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  const players = favDialog.returnValue.split(" ");
  playerOne = players[0];
  playerTwo = players[1];
  console.log("Player One is: " + playerOne);
  console.log("Player Two is: " + playerTwo);
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  (favDialog.close(inputElOne.value + " " + inputElTwo.value), form.reset()); // Have to send the select box value here.
  const players = favDialog.returnValue.split(" ");
  firstNameHeader.textContent = players[0];
  secondNameHeader.textContent = players[1];
});

function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Create 2d array that will represent the state of the game board.
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  //This will be the method of getting the entire board that our UI will eventually need to render it.
  const getBoard = () => board;

  // We need to find the exact square and the player who wants to input the token to the square.
  const selectSquare = (row, column, player) => {
    // If square is already taken return nothing
    if (board[row][column].getValue() != 0) return;

    // Give players token to the board
    board[row][column].addToken(player);
  };
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };
  return { getBoard, selectSquare, printBoard };
}

/*
 ** A Cell represents one "square" on the board and can have one of
 ** 0: no token is in the square,
 ** 1: Player 1's token,
 ** 2: Player 2's token
 */
function Cell() {
  let value = "";

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

/*
 ** The GameController will be responsible for controlling the
 ** flow and state of the game's turns, as well as whether
 ** anybody has won the game
 */

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  let winner;
  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    // Select square for the current user
    console.log(
      `Dropping ${
        getActivePlayer().name
      }'s token into column ${column} and row ${row}...`
    );
    board.selectSquare(row, column, getActivePlayer().token);

    /*  This is where we would check for a winner and handle that logic,
     such as a win message. */
    let currentBoard = board.getBoard();

    let takenSquares = 0;
    const checkForWinner = () => {
      //Check for available squares in the game board
      //If there taken space increase takenSquares var
      currentBoard.map((cell) =>
        cell.map((value) => (value.getValue() != "" ? takenSquares++ : ""))
      );
      //print if there is no available space in the game board
      if (takenSquares === 9) {
        winner = 0;
      }
      if (
        // x vertically win condition
        (currentBoard[0][0].getValue() === players[0].token &&
          currentBoard[1][0].getValue() === players[0].token &&
          currentBoard[2][0].getValue() === players[0].token) ||
        (currentBoard[0][1].getValue() === players[0].token &&
          currentBoard[1][1].getValue() === players[0].token &&
          currentBoard[2][1].getValue() === players[0].token) ||
        (currentBoard[0][2].getValue() === players[0].token &&
          currentBoard[1][2].getValue() === players[0].token &&
          currentBoard[2][2].getValue() === players[0].token) ||
        // x horizontal win condition
        (currentBoard[0][0].getValue() === players[0].token &&
          currentBoard[0][1].getValue() === players[0].token &&
          currentBoard[0][2].getValue() === players[0].token) ||
        (currentBoard[1][0].getValue() === players[0].token &&
          currentBoard[1][1].getValue() === players[0].token &&
          currentBoard[1][2].getValue() === players[0].token) ||
        (currentBoard[2][0].getValue() === players[0].token &&
          currentBoard[2][1].getValue() === players[0].token &&
          currentBoard[2][2].getValue() === players[0].token) ||
        // x diagonal win
        (currentBoard[0][0].getValue() === players[0].token &&
          currentBoard[1][1].getValue() === players[0].token &&
          currentBoard[2][2].getValue() === players[0].token) ||
        (currentBoard[0][2].getValue() === players[0].token &&
          currentBoard[1][1].getValue() === players[0].token &&
          currentBoard[2][0].getValue() === players[0].token)
      ) {
        return (winner = players[0]);
      } else if (
        // o vertically win condition
        (currentBoard[0][0].getValue() === players[1].token &&
          currentBoard[1][0].getValue() === players[1].token &&
          currentBoard[2][0].getValue() === players[1].token) ||
        (currentBoard[0][1].getValue() === players[1].token &&
          currentBoard[1][1].getValue() === players[1].token &&
          currentBoard[2][1].getValue() === players[1].token) ||
        (currentBoard[0][2].getValue() === players[1].token &&
          currentBoard[1][2].getValue() === players[1].token &&
          currentBoard[2][2].getValue() === players[1].token) ||
        // o horizontal win condition
        (currentBoard[0][0].getValue() === players[1].token &&
          currentBoard[0][1].getValue() === players[1].token &&
          currentBoard[0][2].getValue() === players[1].token) ||
        (currentBoard[1][0].getValue() === players[1].token &&
          currentBoard[1][1].getValue() === players[1].token &&
          currentBoard[1][2].getValue() === players[1].token) ||
        (currentBoard[2][0].getValue() === players[1].token &&
          currentBoard[2][1].getValue() === players[1].token &&
          currentBoard[2][2].getValue() === players[1].token) ||
        (currentBoard[0][0].getValue() === players[1].token &&
          currentBoard[1][1].getValue() === players[1].token &&
          currentBoard[2][2].getValue() === players[1].token) ||
        (currentBoard[0][2].getValue() === players[1].token &&
          currentBoard[1][1].getValue() === players[1].token &&
          currentBoard[2][0].getValue() === players[1].token)
      ) {
        return (winner = players[1]);
      }
    };
    checkForWinner();

    //If the winner is defined print the winner and stop the game.
    if (winner === 0) {
      console.log("No winner! Game is Over!");
      board.printBoard();
    } else if (winner) {
      console.log(`Game Over!`);
      console.log(`${winner.token} is the winner!`);
      board.printBoard();
    } else {
      console.log("Check");
      switchPlayerTurn();
      printNewRound();
    }
  };
  const getWinner = () => winner; // Get the winner

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getWinner,
    getBoard: board.getBoard, // For ScreenController to call
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s Turn...`;

    // Render board squares
    let rowNumber = 0; // To give the number to the cells
    board.forEach((row) => {
      row.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function
        cellButton.dataset.column = index;
        cellButton.dataset.row = rowNumber;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
      rowNumber++;
    });
  };

  // Create a value that will show when the game will end
  let gameEnd = false;

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedRow) return;
    if (!selectedColumn) return;

    game.playRound(selectedRow, selectedColumn);
    // Create a condition where the screen will no long update
    if (gameEnd == true) {
      console.log("Game Is Over");
    } else if (!!game.getWinner()) {
      gameEnd = true;
      updateScreen();
    } else {
      updateScreen();
    }
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}

ScreenController();
