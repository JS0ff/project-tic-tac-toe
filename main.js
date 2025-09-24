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

let tableDisplay = [];
for (let i = 0; i < Gameboard().rows; i++) {
  tableDisplay.push([]);
  console.log("{* " + "*" + " *}");
}
