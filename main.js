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
    //Find all available cells in the board and if there is no return nothing
    const availableCells = board
      .filter((row) => row[column].getValue() === 0)
      .map((row) => row[column]);

    if (!availableCells.length) {
      return;
    }

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
