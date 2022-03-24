const cellData = ['', '', '', '', '', '', '', '', ''];
const players = ["x", "o"];
let currentPlayer;

const playerManager = (function () {
  // set player at start
  let playerIndex = 0;
  currentPlayer = players[0];

  function switchPlayer() {
    // cycles through player indexes
    if(++playerIndex >= players.length) playerIndex = 0;
    currentPlayer = players[playerIndex];
  }

  return {switchPlayer};
})();

const displayManager = (function () {
  // elements from dom
  const cells = document.querySelectorAll(".cell");
  
  // clicking a cell
  cells.forEach(cell => cell.addEventListener("click", function () {
    const pos = +cell.dataset.pos;
    // if cell is empty:
    if(!cellData[pos]) {
      cellData[pos] = currentPlayer;
      drawCells();
      playerManager.switchPlayer();
    }
  }));

  // redraw cells with new data
  function drawCells() {
    for(let i = 0; i < 9; i++) {
      cells[i].textContent = cellData[i];
    }
  }

  return {};
})();
