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

// show the game board in the console
// ---note create coordinates for every star to be able
// to change it when the player moves ---
let tableDisplay = [];
for (let i = 0; i < Gameboard().rows; i++) {
  tableDisplay.push([]);
  console.log("{* " + "*" + " *}");
}

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
  console.log(row);
}

// Check if the row or column is complete(diagonal or straight)
function checkForWinner() {}
