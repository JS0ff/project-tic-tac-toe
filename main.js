function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  return { rows, columns };
}

let firstPlayer = {
  moves: [],
};

let secondPlayer = {
  moves: [],
};

//Shows the game table
let tableDisplay = [];

//Make function that runs each round of the game
function playRound() {
  //If table do not have any values in it, then create blocks
  if (tableDisplay.length < 3) {
    // Ask the player to input the coordinates
    let userX = prompt("Please input the coordinates of X") - 1;
    let userY = prompt("Please input the coordinates of Y") - 1;

    for (let i = 0; i < Gameboard().rows; i++) {
      let row = [];
      for (let j = 0; j < Gameboard().columns; j++) {
        if (userX == i && userY == j) {
          row.push("!");
        } else {
          row.push("*");
        }
      }
      tableDisplay.push(row);
    }
  } else {
    userX = prompt("Please input the coordinates of X") - 1;
    userY = prompt("Please input the coordinates of Y") - 1;

    for (let i = 0; i < Gameboard().rows; i++) {
      let row = [];
      for (let j = 0; j < Gameboard().columns; j++) {
        if (tableDisplay[i][j] === "!") {
          row.push("!");
          continue;
        } else if (userX === i && userY === j) {
          row.push("!");
        } else row.push("*");
      }
      tableDisplay[i] = row;
    }
  }
  return tableDisplay;
}

// Check if the row or column is complete(diagonal or straight)
function checkForWinner() {
  //Check for the row
  if (tableDisplay[0][0] && tableDisplay[0][1] && tableDisplay[0][2]) {
    console.log("Winner!!!");
  }
}
