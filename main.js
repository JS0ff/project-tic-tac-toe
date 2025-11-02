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

  const getBoard = () => board;

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };
  return { getBoard, printBoard };
}
