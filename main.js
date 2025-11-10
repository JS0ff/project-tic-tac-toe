/*
 ** The Gameboard represents the state of the board
 ** Each square holds a Cell and we expose a
 ** selectSquare method to be able to add Cells to squares
 */

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
  let value = 0;

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
      token: "x",
    },
    {
      name: playerTwoName,
      token: "o",
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
      `Dropping ${getActivePlayer().name}'s token into column ${column}...`
    );
    board.selectSquare(row, column, getActivePlayer().token);

    /*  This is where we would check for a winner and handle that logic,
     such as a win message. */
    let currentBoard = board.getBoard();
    const checkForWinner = () => {
      if (
        // x vertically win condition
        (currentBoard[0][0].getValue() === "x" &&
          currentBoard[1][0].getValue() === "x" &&
          currentBoard[2][0].getValue() === "x") ||
        (currentBoard[0][1].getValue() === "x" &&
          currentBoard[1][1].getValue() === "x" &&
          currentBoard[2][1].getValue() === "x") ||
        (currentBoard[0][2].getValue() === "x" &&
          currentBoard[1][2].getValue() === "x" &&
          currentBoard[2][2].getValue() === "x") ||
        // x horizontal win condition
        (currentBoard[0][0].getValue() === "x" &&
          currentBoard[0][1].getValue() === "x" &&
          currentBoard[0][2].getValue() === "x") ||
        (currentBoard[1][0].getValue() === "x" &&
          currentBoard[1][1].getValue() === "x" &&
          currentBoard[1][2].getValue() === "x") ||
        (currentBoard[2][0].getValue() === "x" &&
          currentBoard[2][1].getValue() === "x" &&
          currentBoard[2][2].getValue() === "x")
      ) {
        winner = players[0];
      } else if (
        // o vertically win condition
        (currentBoard[0][0].getValue() === "o" &&
          currentBoard[1][0].getValue() === "o" &&
          currentBoard[2][0].getValue() === "o") ||
        (currentBoard[0][1].getValue() === "o" &&
          currentBoard[1][1].getValue() === "o" &&
          currentBoard[2][1].getValue() === "o") ||
        (currentBoard[0][2].getValue() === "o" &&
          currentBoard[1][2].getValue() === "o" &&
          currentBoard[2][2].getValue() === "o") ||
        // o horizontal win condition
        (currentBoard[0][0].getValue() === "o" &&
          currentBoard[0][1].getValue() === "o" &&
          currentBoard[0][2].getValue() === "o") ||
        (currentBoard[1][0].getValue() === "o" &&
          currentBoard[1][1].getValue() === "o" &&
          currentBoard[1][2].getValue() === "o") ||
        (currentBoard[2][0].getValue() === "o" &&
          currentBoard[2][1].getValue() === "o" &&
          currentBoard[2][2].getValue() === "o")
      ) {
        winner = players[1];
      }
    };
    checkForWinner();

    if (winner) {
      console.log(`Game Over!`);
      console.log(`${winner.token} is the winner!`);
    } else {
      console.log("Check");
      switchPlayerTurn();
      printNewRound();
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
