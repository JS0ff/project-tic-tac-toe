// Game board var is Immediately Invoked Function Expression
const gameBoard = function () {
  let row = 3;
  let column = 3;

  return { row, column };
};

//Make display of the game in the console
let screenArr = [];

// X players moves
let x = {
  firstRound: {
    row: 1,
    column: 1,
  },
  secondRound: {
    row: 2,
    column: 2,
  },
  thirdRound: {
    row: 3,
    column: 3,
  },
};

// Show the x players moves in the game display
for (let i = 1; i <= gameBoard().row; i++) {
  let row = [];
  for (let j = 1; j <= gameBoard().column; j++) {
    if (
      (i === x.firstRound.row && j === x.firstRound.column) ||
      (i === x.secondRound.row && j === x.secondRound.column) ||
      (i === x.thirdRound.row && j === x.thirdRound.column)
    ) {
      row.push("x");
    } else {
      row.push("*");
    }
  }
  screenArr.push(row);
}

console.log(screenArr);
